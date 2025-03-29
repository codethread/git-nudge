// all these default to zero values, just an experiment

type Num = number | undefined | null

function orZero(n: Num) {
	if (n === undefined || n === null || Number.isNaN(n)) return 0
	return n
}
export function add(...ns: Num[]): number {
	return ns.reduce<number>((acc, n) => acc + orZero(n), 0)
}
export function sub(...ns: Num[]): number {
	return orZero(
		ns.reduce((acc, n) => {
			if (!acc) return n
			return acc - orZero(n)
		}),
	)
}
export function gt(...ns: Num[]): boolean {
	for (let index = 0; index < ns.length - 1; index++) {
		if (orZero(ns[index]) <= orZero(ns[index + 1])) {
			return false
		}
	}
	return true
}
export function gte(...ns: Num[]): boolean {
	for (let index = 0; index < ns.length - 1; index++) {
		if (orZero(ns[index]) < orZero(ns[index + 1])) {
			return false
		}
	}
	return true
}
export function lt(...ns: Num[]): boolean {
	for (let index = 0; index < ns.length - 1; index++) {
		if (orZero(ns[index]) >= orZero(ns[index + 1])) {
			return false
		}
	}
	return true
}
export function lte(...ns: Num[]): boolean {
	for (let index = 0; index < ns.length - 1; index++) {
		if (orZero(ns[index]) > orZero(ns[index + 1])) {
			return false
		}
	}
	return true
}
export function min(...ns: Num[]) {
	return Math.min(...ns.map(orZero))
}
export function max(...ns: Num[]) {
	return Math.max(...ns.map(orZero))
}
