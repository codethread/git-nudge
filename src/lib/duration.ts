const units = {
	ms: 1,
	secs: 1000,
	mins: 1000 * 60,
	hours: 1000 * 60 * 60,
	days: 1000 * 60 * 60 * 24,
} as const

export function duration(amount: number, unit: keyof typeof units) {
	return units[unit] * amount
}

export function wait(amount: number, unit: keyof typeof units = "ms") {
	return new Promise((res) => setTimeout(res, duration(amount, unit)))
}
