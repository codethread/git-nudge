import {SCHEMA_PATH} from "./constants.ts"
import type {CodegenConfig} from "@graphql-codegen/cli"

const config: CodegenConfig = {
	schema: SCHEMA_PATH,
	generates: {
		"./src/graphql/server.ts": {
			config: {
				useIndexSignature: true,
				//
				useTypeImports: true,
				skipTypename: true,
				enumsAsTypes: true,
				arrayInputCoercion: false,

				customResolverFn:
					"(parent: TParent | Ref, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult",
				// avoidOptionals: true, // use non null type helper instead
				documentMode: "string",
				// mappers: {
				// 	User: "./my-models#UserDbObject",
				// 	Book: "./my-models#Collections",
				// },
			},
			plugins: [
				{
					add: {
						content: "import type {Ref} from '@graphql-tools/mock'\n",
					},
				},
				"typescript",
				"typescript-resolvers",
			],
		},
	},
}
export default config
