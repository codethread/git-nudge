import type {Fetcher} from "./web"
import schemaJson from "@/graphql/schema.json"
import type {Resolvers} from "@/graphql/server"
import {wait} from "@/lib/duration"
import {Db, type FakeDbConfig} from "@/lib/fetcher/fakes/db"
import {getFakeUserFactory} from "@/lib/fetcher/fakes/fakers"
import {createMockedSchema, mocks} from "@/lib/fetcher/fakes/mocks"
import {scalars} from "@/lib/fetcher/fakes/scalars"
import {faker} from "@faker-js/faker"
import {createMockStore} from "@graphql-tools/mock"
import {makeExecutableSchema} from "@graphql-tools/schema"
import * as gql from "graphql"
import {match, P} from "ts-pattern"

interface FakeConfig {
	dbConfig: FakeDbConfig
}
export async function createFetcher(
	_: unknown,
	{dbConfig}: FakeConfig,
): Promise<Fetcher> {
	const schema = makeExecutableSchema<Resolvers>({
		typeDefs: gql.buildClientSchema((schemaJson as ANY_GEN).data),
		resolvers: scalars,
	})

	const mockStore = createMockStore({
		schema,
		mocks,
	})

	const db = new Db(mockStore, dbConfig, {create: getFakeUserFactory()})

	const mockedSchema = createMockedSchema({schema, store: db.store})
	// @ts-expect-error meh
	window.__db = db

	return async (query, ...[variables]) => {
		const variableValues = variables ?? {}
		const source = query.toString().trim()

		failIfMissingScalarMock(schema, source)

		const {data} = await gql.graphql({
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

		// XXX: validate as best as possible that all mocks were implemented
		// typically this fails when a Scalar is missing, and the mock store
		// will fail silently and return `null` for a given node
		traverse(data, (item) => {
			match(item)
				.with(
					{nodes: P.array(P.nullish)},
					{edges: P.array({edge: P.nullish})},
					() => {
						throw new Error(
							`missing mock for paginated item "${item?.__typename}.nodes":\n${JSON.stringify(item)}`,
						)
					},
				)
				.otherwise(() => {})
		})

		await wait(faker.number.int({min: 200, max: 800}))
		return data as ANY_GEN
	}
}

type Callback<T> = (value: T, key?: string | number) => void

function traverse<T = ANY_GEN>(obj: T, callback: Callback<T>): void {
	if (Array.isArray(obj)) {
		for (const item of obj as T[]) {
			callback(item)
			traverse(item, callback)
		}
	} else if (obj !== null && typeof obj === "object") {
		for (const [key, value] of Object.entries(obj)) {
			callback(value, key)
			traverse(value, callback)
		}
	}
}

/**
 * The graph-mock lib is great for lazily mocking types, but if a Scalar mock
 * isn't defined it fails silently and `null`s the whole object. This
 * validation fn will parse a query and visit all fields, if any are known to
 * be Scalar types, `mocks` will be checked for the existence of _something_
 * (specifics are not checked at this time).
 */
function failIfMissingScalarMock(schema: gql.GraphQLSchema, query: string) {
	const ast = gql.parse(query, {noLocation: true})
	const typeInfo = new gql.TypeInfo(schema)
	gql.visit(
		ast,
		gql.visitWithTypeInfo(typeInfo, {
			Field() {
				// probably smarter ways to do this but hacked around in the
				// debugger and this seems consistent
				// it will also flag builtins like String, Int etc, but I'm fine with that
				const type = typeInfo.getType()
				if (type && "ofType" in type) {
					const subType = type.ofType
					const isLeaf = gql.isLeafType(subType)
					if (isLeaf) {
						const name = subType.name
						const mocked = mocks[name]
						if (!mocked) {
							throw new Error(`Scalar field not mocked: ${name}`)
						}
					}
				}
			},
		}),
	)
}
