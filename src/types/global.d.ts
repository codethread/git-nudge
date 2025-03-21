declare const __HASH__: string;

interface IChildren {
	children: React.ReactNode;
}

type IChildrens<Key extends string> = Record<Key, React.ReactNode>;

type NN<T> = NonNullable<T>;

type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

/**
 * Removes 'null' from properties at all levels of a type. Intended to deal with graphql
 */
type DeepNonNullable<T> = {
	[K in keyof T]: T[K] extends object | null
		? DeepNonNullable<NonNullable<T[K]>>
		: NonNullable<T[K]>;
};
