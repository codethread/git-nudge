declare const __HASH__: string
declare const __FAKE_FETCHER__: boolean

interface IChildren {
	children: React.ReactNode
}

type IChildrens<Key extends string> = Record<Key, React.ReactNode>

type NN<T> = NonNullable<T>

type Prettify<T> = {
	[K in keyof T]: T[K]
} & {}

/**
 * Swap graphql null to undefined because preset-client won't let me
 */
type MaybeNot<T> = T extends null
	? undefined
	: T extends Date
		? T
		: {
				[K in keyof T]: T[K] extends (infer U)[]
					? MaybeNot<U>[]
					: MaybeNot<T[K]>
			}
