import type {TypedDocumentString} from "../graphql/graphql";

export interface RequestConfig {
	domain: string;
	token: string;
	timeout: number;
}

export async function execute<TResult, TVariables>(
	{token, domain, timeout}: RequestConfig,
	query: TypedDocumentString<TResult, TVariables>,
	...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
	const response = await fetch(`https://${domain}/api/graphql`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/graphql-response+json",
			Authorization: `Bearer ${token}`,
		},
		signal: AbortSignal.timeout(timeout),
		body: JSON.stringify({
			query,
			variables,
		}),
	});

	if (response.status === 401) {
		throw new Error("Your token is invalid or expired");
	}

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	// biome-ignore lint/suspicious/noExplicitAny: all code consumed through codegen
	const json: any = await response.json();
	return json.data as MaybeNot<TResult>;
}
