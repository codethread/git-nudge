import type {CodegenConfig} from "@graphql-codegen/cli";
import fs from "node:fs";

if (!fs.existsSync("src/graphql/schema.json")) {
	console.log("No schema, run `pnpm getSchema --help`");
	process.exit(1);
}

const config: CodegenConfig = {
	schema: "./src/graphql/schema.json",
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
		"./src/graphql/schema.graphql": {
			plugins: ["schema-ast"],
			config: {
				includeDirectives: true,
			},
		},
	},
};

export default config;
