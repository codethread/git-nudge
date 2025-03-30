import {fakeDBInit} from "./fakes/db"
import type {Fetcher} from "./web"
import type {
	CurrentUser,
	Group,
	MergeRequest,
	Project,
	Scalars,
	UserCore,
	UserCoreConnection,
} from "@/graphql/graphql"
import schemaJson from "@/graphql/schema.json"
import {wait} from "@/lib/duration"
import {fakeInt} from "@/lib/fetcher/fakes/fakers"
import {faker} from "@faker-js/faker"
import {
	addMocksToSchema,
	type relayStylePaginationMock,
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
	Project: Project
	Group: Group
	MergeRequest: MergeRequest
}> = {
	UserCore: () => ({
		avatarUrl: () => "https://placecats.com/300/300",
		webUrl: () => "https://gitlab.com",
	}),
	CurrentUser: () => ({
		avatarUrl: () => "https://placecats.com/200/200",
		webUrl: () => "https://gitlab.com",
	}),
	Project: () => ({
		name: () => faker.commerce.productName(),
	}),
	Group: () => ({
		name: () => faker.commerce.department(),
	}),
	MergeRequest: () => ({
		title: () => faker.commerce.productDescription(),
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
				...mapToResolver(db.getUsers().find((u) => u.active) || {}),
				projectMemberships: paginated(fakeInt(0, 3)),
				groupMemberships: paginated(fakeInt(1, 8)),
				contributedProjects: paginated(fakeInt(4, 9)),
				assignedMergeRequests: paginated(fakeInt(2, 8)),
				authoredMergeRequests: paginated(fakeInt(0, 3)),
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

function paginated(count: number): Resolver {
	return (_, params, __, g) => {
		const DEFAULT_PAGE_SIZE = 100 // for GitLab
		const EMPTY_NODE = (id: number) => ({id: id.toString()}) // tells mocking system to create all missing properties
		const {after, first} = params

		if (params.last || params.before) throw new Error("no mock setup")

		const list = [...new Array(count)].map((_, i) => i + 1)
		const idx = Number.parseInt(after || "0", 10)
		const slice = list.slice(idx, (first || DEFAULT_PAGE_SIZE) + idx)
		const lastIdx = slice.at(-1)

		console.log("codethread", params, slice)
		return {
			count,
			nodes: slice.map((i) => EMPTY_NODE(i)),
			edges: slice.map((i) => ({
				cursor: i,
				node: EMPTY_NODE(i),
			})),
			pageInfo: {
				hasNextPage: lastIdx && lastIdx < count,
				endCursor: lastIdx || after,
				hasPreviousPage: false, // not using
			},
		}
	}
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
