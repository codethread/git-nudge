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

export const logger = {
	...slimLogger,
	context(name: string) {
		return {
			...slimLogger,
			...Object.fromEntries(
				Object.entries(pick(slimLogger, ["debug", "info", "warn"])).map(
					([meth, fn]: [string, (...args: ANY_TRUST_ME[]) => void]) => [
						meth,
						(...args: ANY_TRUST_ME[]) => fn(name, ...args),
					],
				),
			),
		}
	},
}
