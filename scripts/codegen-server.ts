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
				// avoidOptionals: true, // use non null type helper instead
				documentMode: "string",
				// mappers: {
				// 	User: "./my-models#UserDbObject",
				// 	Book: "./my-models#Collections",
				// },
			},
			plugins: ["typescript", "typescript-resolvers"],
		},
	},
}
export default config
