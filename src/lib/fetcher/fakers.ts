import fixture from "./fixtureData.json"
import {faker} from "@faker-js/faker"

export function getFakeUserFactory() {
	const unseen = fixture.users.map((_, i) => i)
	shuffle(unseen)

	return () => {
		const id = unseen.pop()
		return id ? fixture.users.at(id) : undefined
	}
}

export function fakeChoice<A>(items: A[]) {
	return items.at(faker.number.int({min: 1, max: items.length}))
}

export function fakeTrue(n: number) {
	return fakeChoiceWeight(
		new Map([
			[true, n],
			[false, null],
		]),
	)
}

function fakeChoiceWeight<A>(items: Map<A, number | null>) {
	const max = 100
	const entries = [...items.entries()] // can only iterate once it seems??
	const [totalWeight, unweighted] = entries.reduce(
		([acc, unweighted], [_, weight]) => [
			acc + (weight ?? 0),
			unweighted + (weight === null ? 1 : 0),
		],
		[0, 0],
	)
	if (totalWeight < 1 || totalWeight > max)
		throw Error(
			`weighting Map should be values out of ${max}, with the sum being <= ${max}. null can be provided to have leftover weights inferred`,
		)

	const defaultWeight = (max - totalWeight) / unweighted
	const weights = entries.map(
		([item, weight]) => [item, weight ?? defaultWeight] as [A, number],
	)

	const n = faker.number.int({min: 1, max})
	let acc = 0
	for (const [item, weight] of weights) {
		acc += weight
		if (n <= acc) return item
	}
	throw new Error("never found item")
}

function shuffle<A>(array: A[]) {
	let currentIndex = array.length

	// While there remain elements to shuffle...
	while (currentIndex !== 0) {
		// Pick a remaining element...
		const randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex--

		// And swap it with the current element.
		// @ts-ignore
		;[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		]
	}
}
