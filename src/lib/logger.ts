import {pick} from "@/lib/utils"

export type SlimLogger = typeof slimLogger

export type Logger = typeof logger

const slimLogger = pick(console, [
	"info",
	"warn",
	"error",
	"debug",
	"group",
	"groupCollapsed",
	"groupEnd",
])

function createContextLogger(name: string) {
	const prefix = `[${name.toUpperCase()}]`
	return {
		...slimLogger,
		...Object.fromEntries(
			Object.entries(pick(slimLogger, ["debug", "info", "warn"])).map(
				([meth, fn]: [string, (...args: unknown[]) => void]) => [
					meth,
					(...args: unknown[]) => fn(prefix, ...args),
				],
			),
		),
		groupCollapsed(...data: unknown[]) {
			console.groupCollapsed(prefix, ...data)
		},
	}
}

export const logger = {
	...createContextLogger("📙 global"),
	context: createContextLogger,
}
