import fixture from "./fixtureData.json"
import {add} from "@/lib/maths"
import {faker} from "@faker-js/faker"

export function fakeInt(min: number, max?: number) {
	return faker.number.int({min, max: max ?? min * 3})
}
export function getFakeUserFactory() {
	const unseen = fixture.users.map((_, i) => i)
	shuffle(unseen)

	return () => {
		const id = unseen.pop()
		return id ? fixture.users.at(id) : undefined
	}
}

export function fakeOption<A>(items: A[]): A {
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	return items.at(faker.number.int({min: 0, max: items.length - 1}))!
}

export function fakeTrue(n: number) {
	return fakeChoiceWeight([true, n], [false])
}

/**
 * randomly choose an item from variadic tuple args
 * Each tuple is a value: percentage pair
 * The percentage can be omitted and it will use an even split of the remainder
 *
 * @example
 * The following are equivalent
 * ```ts
 * fakeChoiceWeight(["cat", 80], ["dog", 10], ["fish", 10])
 * fakeChoiceWeight(["cat", 80], ["dog"], ["fish"])
 * ```
 */
export function fakeChoiceWeight<A>(
	...items: ([A | undefined] | [A | undefined, number])[]
): A {
	const max = 100
	const [totalWeight, unweighted] = items.reduce(
		([acc, unweighted], [_, weight]) => [
			add(acc, weight),
			unweighted + (weight === null ? 1 : 0),
		],
		[0, 0],
	)
	if (totalWeight < 1 || totalWeight > max)
		throw Error(
			`weighting Map should be values out of ${max}, with the sum being <= ${max}. null can be provided to have leftover weights inferred`,
		)

	const defaultWeight = (max - totalWeight) / unweighted
	const weights = items.map(
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
