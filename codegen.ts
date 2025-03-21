import type {CodegenConfig} from "@graphql-codegen/cli";

const config: CodegenConfig = {
	schema: "./schema.json",
	documents: ["src/**/*.tsx"],
	ignoreNoDocuments: true,
	generates: {
		"./src/graphql/": {
			preset: "client",
			presetConfig: {
				fragmentMasking: false,
			},
			config: {
				useTypeImports: true,
				skipTypename: true,
				enumsAsTypes: true,
				arrayInputCoercion: false,
				// avoidOptionals: true, // use non null type helper instead
				documentMode: "string",
			},
			hooks: {
				// TODO: not working?
				afterOneFileWrite: ["prettier --write"],
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
