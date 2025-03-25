import {mocks, storeInit} from "./mocks"
import type {Fetcher} from "./web"
import {
	addMocksToSchema,
	createMockStore,
	relayStylePaginationMock,
} from "@graphql-tools/mock"
import {makeExecutableSchema} from "@graphql-tools/schema"
import {graphql, buildClientSchema} from "graphql"

export async function createFetcher(): Promise<Fetcher> {
	// biome-ignore lint/suspicious/noExplicitAny: codegen
	const {default: schemaJson}: any = await import("../../graphql/schema.json")

	const schema = makeExecutableSchema({
		typeDefs: buildClientSchema(schemaJson.data),
	})

	const store = createMockStore({schema, mocks})

	storeInit(store)

	const mockedSchema = addMocksToSchema({
		schema,
		store,
		mocks,
		resolvers: (store) => ({
			Query: {
				users: paginated(relayStylePaginationMock(store)),
			},
			CurrentUser: {
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
