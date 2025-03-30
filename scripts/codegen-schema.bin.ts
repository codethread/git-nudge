import {main as downloadSchema, EnvSchema} from "./download-schema.ts"
import {generate} from "@graphql-codegen/cli"
import fs from "node:fs"

async function main() {
	await getSchemaIfMissing()
	await buildGraphqlFile()
}

async function getSchemaIfMissing() {
	if (!fs.existsSync("src/graphql/schema.json")) {
		await downloadSchema({}, EnvSchema.parse(process.env))
	}
}

async function buildGraphqlFile() {
	return generate(
		{
			schema: "./src/graphql/schema.json",
			generates: {
				"./src/graphql/schema.graphql": {
					plugins: ["schema-ast"],
					config: {
						includeDirectives: true,
					},
				},
			},
		},
		true,
	)
}

main()
