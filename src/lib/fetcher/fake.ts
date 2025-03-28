import {fakeDBInit} from "./fakes/db"
import type {Fetcher} from "./web"
import type {
	CurrentUser,
	Scalars,
	UserCore,
	UserCoreConnection,
} from "@/graphql/graphql"
import schemaJson from "@/graphql/schema.json"
import {wait} from "@/lib/duration"
import {faker} from "@faker-js/faker"
import {
	addMocksToSchema,
	relayStylePaginationMock,
	type RelayPaginationParams,
} from "@graphql-tools/mock"
import {makeExecutableSchema} from "@graphql-tools/schema"
import {graphql, buildClientSchema} from "graphql"

type Mock<T> = {[K in keyof T]: () => Partial<T[K]>}
type Mocks<T> = {[K in keyof T]: () => Partial<Mock<T[K]>>}
type ScalarsMap = {[K in keyof Scalars]: () => Scalars[K]["output"]}

const scalars: Partial<ScalarsMap> = {
	UserID: () => {
		// in theory this should never be used because we add users in the store
		// however it is still called, and I'm not yet sure why
		return faker.string.uuid()
	},
}

const objects: Mocks<{
	UserCore: UserCore
	CurrentUser: CurrentUser
}> = {
	UserCore: () => ({
		avatarUrl: () => "https://placecats.com/300/300",
		webUrl: () => "https://gitlab.com",
	}),
	CurrentUser: () => ({
		avatarUrl: () => "https://placecats.com/200/200",
		webUrl: () => "https://gitlab.com",
	}),
}

const mocks = {...scalars, ...objects}

export async function createFetcher(): Promise<Fetcher> {
	const schema = makeExecutableSchema({
		typeDefs: buildClientSchema((schemaJson as ANY_GEN).data),
	})

	const db = await fakeDBInit()

	const mockedSchema = addMocksToSchema({
		schema,
		mocks,
		resolvers: (store) => ({
			Query: {
				users: (_: null, params: RelayPaginationParams): UserCoreConnection => {
					const DEFAULT_PAGE_SIZE = 100 // for GitLab
					const {after, first} = params

					if (params.last || params.before) throw new Error("no mock setup")

					const allUsers = db.getUsers()
					const idx = Number.parseInt(after || "0", 10)
					const users = allUsers.slice(idx, (first || DEFAULT_PAGE_SIZE) + idx)
					const lastUser = users.at(-1)

					return {
						count: allUsers.length,
						nodes: users as ANY_RESOLVER,
						pageInfo: {
							hasNextPage: lastUser?.id < allUsers.length,
							endCursor: lastUser?.id || after,
							hasPreviousPage: false, // not using
						},
					}
				},
			},
			CurrentUser: {
				...mapToResolver(db.getUsers().findLast((u) => u.active) || {}),
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
		await wait(faker.number.int({min: 500, max: 1500}))

		const queryLine = source.slice(0, source.indexOf("\n", 1))
		console.groupCollapsed(`🚀 GRAPHQL ${queryLine}`)
		console.groupCollapsed("query")
		console.log(source)
		console.groupEnd()
		console.log("vars", variableValues)
		console.log(data)
		console.groupEnd()

		return data as ANY_GEN
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

/**
 * biome-ignore lint/suspicious/noExplicitAny: Could fix with resolver types from codgen but seems overkill at this point
 */
type ANY_RESOLVER = any
