import type {Fetcher} from "./web"
import schemaJson from "@/graphql/schema.json"
import type {Resolvers} from "@/graphql/server"
import {wait} from "@/lib/duration"
import {Db, type FakeDbConfig} from "@/lib/fetcher/fakes/db"
import {getFakeUserFactory} from "@/lib/fetcher/fakes/fakers"
import {
	createMockedSchema,
	mocks,
	resolverImplemntationMap,
	resolvers,
} from "@/lib/fetcher/fakes/mocks"
import {scalars} from "@/lib/fetcher/fakes/scalars"
import {assert} from "@/lib/utils"
import {faker} from "@faker-js/faker"
import {createMockStore} from "@graphql-tools/mock"
import {makeExecutableSchema} from "@graphql-tools/schema"
import {error} from "console"
import * as gql from "graphql"

interface FakeConfig {
	dbConfig: FakeDbConfig
}
export async function createFetcher(
	_: unknown,
	{dbConfig}: FakeConfig,
): Promise<Fetcher> {
	const schema = makeExecutableSchema<Resolvers>({
		typeDefs: gql.buildClientSchema((schemaJson as ANY_GEN).data),
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
		const queryLine = source.slice(0, source.indexOf("\n", 1))

		// try {
		// 	failIfMissingMocks(schema, source, {
		// 		paginationPredicate: (_, type) => type.name.endsWith("Connection"),
		// 		ignoreMissingScalars: ["Int", "Float", "Boolean"],
		// 	})
		// } catch (e) {
		// 	console.error(e)
		// 	throw e
		// }

		const {data, errors} = await gql.graphql({
			schema: mockedSchema,
			variableValues,
			source,
		})
		if (errors) {
			errors.forEach((e) => console.error(e))
			throw new Error(errors.at(0)?.message)
		}

		console.groupCollapsed(`🚀 GRAPHQL ${queryLine}`)
		console.groupCollapsed("query")
		console.log(source)
		console.groupEnd()
		console.log("vars", variableValues)

		console.log(data)
		console.groupEnd()

		await wait(faker.number.int({min: 200, max: 800}))
		return data as ANY_GEN
	}
}

/**
 * The graph-mock lib is great for lazily mocking types, but...
 *
 * Scalars:
 * if a Scalar mock isn't defined it fails silently and `null`s the whole
 * object. This validation fn will parse a query and visit all fields, if any
 * are known to be Scalar types, `mocks` will be checked for the existence of
 * _something_ (specifics are not checked at this time).
 *
 * Pagination:
 * if using something more complex than a list, i.e relay style pagination, the
 * mocks will be weird. The mock lib provides `relayStylePaginationMock`, but
 * this needs to be set explicitly, so this function will try to spot missing
 * pagination mocks (indicated by <Type>Connection schema types, which is the
 * relay convention
 */
function failIfMissingMocks(
	schema: gql.GraphQLSchema,
	query: string,
	opts: {
		paginationPredicate: (
			field: gql.FieldNode,
			type: gql.GraphQLObjectType,
		) => boolean
		ignoreMissingScalars: string[]
	},
) {
	const ast = gql.parse(query, {noLocation: true})
	const typeInfo = new gql.TypeInfo(schema)
	gql.visit(
		ast,
		gql.visitWithTypeInfo(typeInfo, {
			Field(field) {
				const type = typeInfo.getType()

				// validate pagination is present
				if (gql.isObjectType(type) && opts.paginationPredicate(field, type)) {
					const parent = typeInfo.getParentType()?.name
					const name = field.name.value
					assert(parent, "should be a parent here")
					const found = resolverImplemntationMap[parent][name]
					debugger
					if (!found)
						throw new Error(`Pagination not set up for ${parent}.${name}`)
					assert(found, `Pagination not set up for ${parent}.${name}`)
				}

				// validate scalar is present
				// probably smarter ways to do this but hacked around in the
				// debugger and this seems consistent
				// it will also flag builtins like String, Int etc, but I'm fine with that
				if (type && "ofType" in type) {
					const subType = type.ofType
					if (
						gql.isScalarType(subType) &&
						!opts.ignoreMissingScalars.includes(subType.name)
					) {
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
