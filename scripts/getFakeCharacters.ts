import {exec} from "node:child_process"
import fs from "node:fs/promises"

const fixtureFile = "src/lib/fetcher/fixtureData.json"

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

function run(cmd: string) {
	return new Promise((res, rej) => {
		exec(cmd)
			.on("error", rej)
			.on("exit", (status) => {
				if (status === 0) res(undefined)
				else rej(`FAILED: ${cmd}`)
			})
	})
}

const gql = plainString

function plainString(str: TemplateStringsArray, ...strs: string[]) {
	return str.reduce((out, chunk, i) => out + chunk + (strs.at(i) || ""), "")
}

;(async () => {
	const users = await getAllUsers()
	await fs.writeFile(fixtureFile, JSON.stringify({users}, null, 2), "utf-8")

	await run(`pnpm exec prettier --write ${fixtureFile}`)
})()
