import netrc from "netrc"
import {match, P} from "ts-pattern"
import {z} from "zod"
import {fromError} from "zod-validation-error"

const NetrcSchema = z.record(
	z.string(),
	z.object({
		login: z.string(),
		password: z.string(),
	}),
	{message: "unable to parse Netrc"},
)

export type Netrc = z.TypeOf<typeof NetrcSchema>

export function parseNetrc(netrcStr?: string): ParsedConfig {
	if (!netrcStr) return {tag: "missing"}

	let net: unknown = null

	try {
		net = netrc.parse(netrcStr)
	} catch (e) {
		console.error(e)
	}
	const {data, error} = NetrcSchema.safeParse(net)
	if (error) {
		return {tag: "invalid", err: fromError(error).toString()}
	}
	const machines = Object.entries(data)

	return match(machines)
		.returnType<ParsedConfig>()
		.with([P.select()], ([domain, {login, password}]) => ({
			tag: "valid",
			netrc: {domain, pass: password, user: login},
		}))
		.otherwise(() => ({
			tag: "multiple",
			netrc: data,
		}))
}

type ParsedConfig =
	| {tag: "missing"}
	| {
			tag: "invalid"
			err: string
	  }
	| {
			tag: "valid"
			netrc: {
				domain: string
				user: string
				pass: string
			}
	  }
	| {
			tag: "multiple"
			netrc: Netrc
	  }
