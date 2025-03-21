import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: './schema.json',
	documents: ['src/**/*.tsx'],
	ignoreNoDocuments: true,
	generates: {
		'./src/graphql/': {
			preset: 'client',
			presetConfig: {
				fragmentMasking: false,
			},
			config: {
				useTypeImports: true,
				skipTypename: true,
				enumsAsTypes: true,
				arrayInputCoercion: false,
				// avoidOptionals: true, // use non null type helper instead
				documentMode: 'string',
			},
		},
		'./schema.graphql': {
			plugins: ['schema-ast'],
			config: {
				includeDirectives: true,
			},
		},
	},
	hooks: {
		afterOneFileWrite: ['prettierd --write'],
	},
};

export default config;
