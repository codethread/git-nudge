import type {relayStylePaginationMock} from "@graphql-tools/mock"

type Resolver = ReturnType<typeof relayStylePaginationMock>

export function paginated(count: number): Resolver {
	return (_, params, __, g) => {
		const DEFAULT_PAGE_SIZE = 100 // for GitLab
		const EMPTY_NODE = (id: number) => ({id: id.toString()}) // tells mocking system to create all missing properties
		const {after, first} = params

		if (params.last || params.before) throw new Error("no mock setup")

		const list = [...new Array(count)].map((_, i) => i + 1)
		const idx = Number.parseInt(after || "0", 10)
		const slice = list.slice(idx, (first || DEFAULT_PAGE_SIZE) + idx)
		const lastIdx = slice.at(-1)

		return {
			count,
			nodes: slice.map((i) => EMPTY_NODE(i)),
			edges: slice.map((i) => ({
				cursor: i,
				node: EMPTY_NODE(i),
			})),
			pageInfo: {
				hasNextPage: lastIdx && lastIdx < count,
				endCursor: lastIdx || after,
				hasPreviousPage: false, // not using
			},
		}
	}
}

export function mapToResolver<A extends object>(obj: A) {
	return Object.fromEntries(
		Object.entries(obj).map(([k, v]) => [k, () => v]),
	) as {[Key in keyof A]: () => A[Key]}
}

/**
 * biome-ignore lint/suspicious/noExplicitAny: Could fix with resolver types from codgen but seems overkill at this point
 */
export type ANY_RESOLVER = any
