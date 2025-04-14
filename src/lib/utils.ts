import {type ClassValue, clsx} from "clsx"
import equal from "fast-deep-equal"
import React from "react"
import {twMerge} from "tailwind-merge"
import {match, P} from "ts-pattern"
import type {Simplify} from "type-fest"
import {ZodError} from "zod"
import {fromError} from "zod-validation-error"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function throwError(e: unknown): never {
	if (typeof e === "string") throw new Error(e)
	if (e instanceof Error) throw e
	throw new Error(JSON.stringify(e))
}

export function parseError(e: unknown): string {
	if (e instanceof ZodError) {
		return fromError(e).toString()
	}
	if (e instanceof Error) {
		return `${e.message}\n${e?.stack || ""}`
	}

	return JSON.stringify(e)
}

export function useNeededContext<A>(
	ctx: Record<string, React.Context<A>>,
): NonNullable<A> {
	const [name, context] = match(Object.entries(ctx))
		.with(
			[P.select()],
			([name, context]) => [name, React.useContext(context)] as const,
		)
		.otherwise(() =>
			throwError(
				"useNeededContext context param should be a record with a single contex value passed in",
			),
		)

	if (!context)
		throw new Error(`${name} should be used inside ${name}.Provider`)
	return context
}

export function pick<T extends object, K extends keyof T>(
	obj: T,
	keys: K[],
): Simplify<Pick<T, K>> {
	const result = {} as Pick<T, K>
	keys.forEach((key) => {
		if (key in obj) {
			result[key] = obj[key]
		}
	})
	return result
}

export function repeat<A>(i: number, cb: (i: number) => A): A[] {
	const res = [] as A[]
	let idx = 0
	while (idx < i) {
		res.push(cb(idx))
		idx++
	}
	return res
}

export function uniqueBy<A extends Record<string, unknown>>(
	key: keyof A,
): (arr: A) => boolean {
	const seenKey = new Set()
	return (item) => {
		if (!seenKey.has(item[key])) {
			seenKey.add(item[key])
			return true
		}
		return false
	}
}

export function assert(condition: unknown, msg?: string): asserts condition {
	if (!condition) {
		throw new Error(msg || "Something went wrong")
	}
}

export function assertEq<A>(
	items: (A | unknown)[],
	msg?: string,
): asserts items is A[] {
	const mismatch = items.find((item, i) => {
		if (i + 1 === items.length) return false
		return !equal(item, items[i + 1])
	})
	if (mismatch) {
		console.error(items)
		throw new Error(msg ?? "objects not equal")
	}
}
