import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	schema: "./schema.json",
	documents: ["src/**/*.tsx"],
	ignoreNoDocuments: true,
	generates: {
		"./src/graphql/": {
			preset: "client",
			// plugins: ["typescript-react-query"],
			presetConfig: {
				fragmentMasking: false,
			},
			config: {
				useTypeImports: true,
				skipTypename: true,
				enumsAsTypes: true,
				avoidOptionals: true,
				documentMode: "string",
			},
		},
		"./schema.graphql": {
			plugins: ["schema-ast"],
			config: {
				includeDirectives: true,
			},
		},
	},
};

export default config;
