declare module 'netrc' {
	interface Netrc {
		parse(s: string): unknown;
	}
	const netrc: Netrc;
	export default netrc;
}
