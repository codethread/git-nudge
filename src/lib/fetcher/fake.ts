import {mocks, storeInit} from "./mocks"
import type {Fetcher} from "./web"
import type {UserCoreConnection} from "@/graphql/graphql"
import {
	addMocksToSchema,
	relayStylePaginationMock,
	type RelayPaginationParams,
} from "@graphql-tools/mock"
import {makeExecutableSchema} from "@graphql-tools/schema"
import {graphql, buildClientSchema} from "graphql"

export async function createFetcher(): Promise<Fetcher> {
	// biome-ignore lint/suspicious/noExplicitAny: codegen
	const {default: schemaJson}: any = await import("../../graphql/schema.json")

	const schema = makeExecutableSchema({
		typeDefs: buildClientSchema(schemaJson.data),
	})

	const st = await storeInit()

	const mockedSchema = addMocksToSchema({
		schema,
		// store,
		mocks,
		resolvers: (store) => ({
			Query: {
				users: (_: null, params: RelayPaginationParams): UserCoreConnection => {
					const {after, first} = params

					if (params.last || params.before) throw new Error("no mock setup")

					const allUsers = st.getUsers()
					const users = allUsers.slice(Number.parseInt(after || "0", 10), first)
					const lastUser = users.at(-1)

					return {
						count: allUsers.length,
						// biome-ignore lint/suspicious/noExplicitAny: <explanation>
						nodes: users as any,
						pageInfo: {
							hasNextPage: lastUser?.id < allUsers.length,
							endCursor: lastUser?.id || after,
							hasPreviousPage: false, // not using
						},
					}
				},
			},
			CurrentUser: {
				...mapToResolver(st.getUser("1") || {}),
				projectMemberships: relayStylePaginationMock(store),
				groupMemberships: relayStylePaginationMock(store),
				contributedProjects: relayStylePaginationMock(store),
			},
		}),
	})
	return async (query, ...[variables]) => {
		const variableValues = variables ?? {}
		const source = query.toString().trim()
		const {data} = await graphql({
			schema: mockedSchema,
			variableValues,
			source,
		})

		const queryLine = source.slice(0, source.indexOf("\n", 1))
		console.groupCollapsed(`🚀 GRAPHQL ${queryLine}`)
		console.groupCollapsed("query")
		console.log(source)
		console.groupEnd()
		console.log("vars", variableValues)
		console.log(data)
		console.groupEnd()

		// biome-ignore lint/suspicious/noExplicitAny: codegen
		return data as any
	}
}

type Resolver = ReturnType<typeof relayStylePaginationMock>
/**
 * GitLab doesn't quite follow relay, so we adapt
 */
function paginated(fn: Resolver) {
	const cb: Resolver = (...args) => {
		const page = fn(...args)
		return {
			...page,
			count: page.totalCount,
			nodes: page.edges.map((e: {node: string}) => e.node),
		}
	}
	return cb
}

function mapToResolver<A extends object>(obj: A) {
	return Object.fromEntries(
		Object.entries(obj).map(([k, v]) => [k, () => v]),
	) as {[Key in keyof A]: () => A[Key]}
}
