import type {TypedDocumentString} from '../graphql/graphql';
import type {IConfig} from '../hooks/useConfig';

export async function execute<TResult, TVariables>(
	conf: IConfig,
	query: TypedDocumentString<TResult, TVariables>,
	...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
	const response = await fetch(`https://${conf.gitlab.domain}/api/graphql`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/graphql-response+json',
			Authorization: `Bearer ${conf.gitlab.token}`,
		},
		body: JSON.stringify({
			query,
			variables,
		}),
	});

	if (response.status === 401) {
		throw new Error('Your token is invalid or expired');
	}

	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	const json = await response.json();
	return json.data as TResult;
}
