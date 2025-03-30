import {FIXTURE_FILE} from "./constants.ts"
import {run} from "./run.ts"
import fs from "node:fs/promises"

interface User {
	name: string
	image: string
}

async function getAllUsers() {
	let nextPage: number | undefined = undefined
	const users: User[] = []

	do {
		const {info, results} = await getUsers(nextPage)
		nextPage = info.next
		users.push(...results)
	} while (users.length < 150 && nextPage)

	return users.map((user) => ({
		name: user.name,
		avatarUrl: user.image,
	}))
}

async function getUsers(page?: number) {
	const j = await fetch("https://rickandmortyapi.graphcdn.app/", {
		headers: {
			accept: "application/json",
			"content-type": "application/json",
		},
		body: JSON.stringify({
			query: gql`
				query Chars($page: Int) {
					characters(page: $page) {
						info {
							next
						}
						results {
							name
							image
						}
					}
				}
			`,
			variables: {page},
			operationName: "Chars",
		}),
		method: "POST",
	})
	const {data, errors} = await j.json()
	if (errors) {
		console.log("ERROR")
		console.log(JSON.stringify(errors, null, 2))
		process.exit(1)
	}
	return data.characters as {
		info: {next?: number}
		results: User[]
	}
}

const gql = plainString

function plainString(str: TemplateStringsArray, ...strs: string[]) {
	return str.reduce((out, chunk, i) => out + chunk + (strs.at(i) || ""), "")
}

;(async () => {
	const users = await getAllUsers()
	await fs.writeFile(FIXTURE_FILE, JSON.stringify({users}, null, 2), "utf-8")

	await run(`pnpm exec prettier --ignore-file='' --write ${FIXTURE_FILE}`)
})()
