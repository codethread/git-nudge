import type {Fetcher} from "./web"
import type {CurrentUser, UserCore, Scalars} from "@/graphql/graphql"
import {faker} from "@faker-js/faker"
import {addMocksToSchema, relayStylePaginationMock} from "@graphql-tools/mock"
import {makeExecutableSchema} from "@graphql-tools/schema"
import {graphql, buildClientSchema} from "graphql"

// all any type anyway
// import type { Scalars } from '../src/graphql/graphql'

type Mock<T> = {[K in keyof T]: () => Partial<T[K]>}
type Mocks<T> = {[K in keyof T]: () => Partial<Mock<T[K]>>}
type ScalarsMap = {[K in keyof Scalars]: () => Scalars[K]["output"]}

const scalars: Partial<ScalarsMap> = {
	UserID: () => faker.string.uuid(),
}

const objects: Mocks<{
	UserCore: UserCore
	CurrentUser: CurrentUser
}> = {
	UserCore: () => ({
		avatarUrl: () => "https://placecats.com/300/300",
		webUrl: () => "https://gitlab.com",
	}),
	CurrentUser: () => {
		const name = faker.person.fullName()
		return {
			username: () => name.replaceAll(" ", ".").toLowerCase(),
			name: () => name,
			avatarUrl: () => "https://placecats.com/200/200",
		}
	},
}

const mocks = {...scalars, ...objects}

export async function createFetcher(): Promise<Fetcher> {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const {default: schemaJson}: any = await import("../../graphql/schema.json")
	const schema = addMocksToSchema({
		schema: makeExecutableSchema({
			typeDefs: buildClientSchema(schemaJson.data),
		}),
		mocks,
		resolvers: (store) => ({
			Query: {
				users: relayStylePaginationMock(store),
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
		const source = query.toString()
		const {data} = await graphql({
			schema,
			variableValues,
			source,
		})
		console.groupCollapsed("🚀 GRAPHQL", data)
		console.log({query, variableValues})
		console.log(data)
		console.groupEnd()
		// biome-ignore lint/suspicious/noExplicitAny: codegen
		return data as any
	}
}
