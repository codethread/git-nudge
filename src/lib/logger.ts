import {pick} from "@/lib/utils"

export type SlimLogger = typeof slimLogger
export const slimLogger = pick(console, [
	"info",
	"warn",
	"error",
	"debug",
	"group",
	"groupCollapsed",
	"groupEnd",
])
