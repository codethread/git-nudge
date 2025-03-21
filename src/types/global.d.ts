declare const __HASH__: string;

interface IChildren {
	children: React.ReactNode;
}

type IChildrens<Key extends string> = Record<Key, React.ReactNode>;

type NN<T> = NonNullable<T>;

type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};
