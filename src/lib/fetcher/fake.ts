import type {Fetcher} from "./web"
import schemaJson from "@/graphql/schema.json"
import type {Resolvers} from "@/graphql/server"
import {wait} from "@/lib/duration"
import {Db} from "@/lib/fetcher/fakes/db"
import {getFakeUserFactory} from "@/lib/fetcher/fakes/fakers"
import {createMockedSchema, mocks} from "@/lib/fetcher/fakes/mocks"
import {faker} from "@faker-js/faker"
import {createMockStore} from "@graphql-tools/mock"
import {makeExecutableSchema} from "@graphql-tools/schema"
import {graphql, buildClientSchema} from "graphql"

export async function createFetcher(): Promise<Fetcher> {
	const schema = makeExecutableSchema<Resolvers>({
		typeDefs: buildClientSchema((schemaJson as ANY_GEN).data),
	})

	const mockStore = createMockStore({
		schema,
		mocks,
	})

	const db = new Db(mockStore, {users: 37}, {create: getFakeUserFactory()})

	const mockedSchema = createMockedSchema({schema, store: db.store})

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
