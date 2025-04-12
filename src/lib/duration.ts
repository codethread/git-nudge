const units = {
	ms: 1,
	secs: 1000,
	mins: 1000 * 60,
	hours: 1000 * 60 * 60,
	days: 1000 * 60 * 60 * 24,
} as const
type Unit = keyof typeof units

export type IDuration = {amount: number; unit: Unit}
export function duration(amount: number, unit: Unit) {
	return units[unit] * amount
}

export function wait(amount: number, unit: Unit = "ms") {
	return new Promise((res) => setTimeout(res, duration(amount, unit)))
}
