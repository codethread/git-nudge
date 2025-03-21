import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: './schema.json',
	documents: ['src/**/*.tsx'],
	ignoreNoDocuments: true,
	generates: {
		'./src/graphql/': {
			preset: 'client',
			// plugins: ["typescript-react-query"],
			presetConfig: {
				fragmentMasking: false,
				maybeValue: 'T | null | undefined',
			},
			config: {
				useTypeImports: true,
				skipTypename: true,
				enumsAsTypes: true,
				avoidOptionals: true,
				documentMode: 'string',
				maybeValue: 'T | null | undefined',
			},
		},
		'./schema.graphql': {
			plugins: ['schema-ast'],
			config: {
				includeDirectives: true,
				maybeValue: 'T | null | undefined',
			},
		},
	},
};

export default config;
