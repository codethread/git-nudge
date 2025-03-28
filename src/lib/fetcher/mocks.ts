import type {CurrentUser, UserCore, Scalars} from "@/graphql/graphql"
import {fakeTrue, getFakeUserFactory} from "@/lib/fetcher/fakers"
import {faker} from "@faker-js/faker"

type Mock<T> = {[K in keyof T]: () => Partial<T[K]>}
type Mocks<T> = {[K in keyof T]: () => Partial<Mock<T[K]>>}
type ScalarsMap = {[K in keyof Scalars]: () => Scalars[K]["output"]}

const scalars: Partial<ScalarsMap> = {
	UserID: () => {
		// in theory this should never be used because we add users in the store
		// however it is still called, and I'm not yet sure why
		return faker.string.uuid()
	},
}

const objects: Mocks<{
	UserCore: UserCore
	CurrentUser: CurrentUser
}> = {
	UserCore: () => ({
		avatarUrl: () => "https://placecats.com/300/300",
		webUrl: () => "https://gitlab.com",
	}),
	CurrentUser: () => ({
		avatarUrl: () => "https://placecats.com/200/200",
		webUrl: () => "https://gitlab.com",
	}),
}

export const mocks = {...scalars, ...objects}

type UserBase = Partial<UserCore | CurrentUser>

class GitlabStore {
	private users = [] as UserBase[]
	/** keeping id as index makes pagination easier */
	private userIdx = 0
	private getFakeUser = getFakeUserFactory()

	getUser(id: string) {
		return this.users.find((user) => user.id === id)
	}

	getUsers() {
		return this.users
	}

	addUsers(users: Partial<UserCore>[]) {
		for (const user of users) {
			this.addUser(user)
		}
	}

	addUser(user?: Partial<UserCore>) {
		const id = ++this.userIdx // increment then return
		const fixtureUser = this.getFakeUser()
		const name = user?.name ?? fixtureUser?.name ?? faker.person.fullName()

		this.users.push({
			avatarUrl: `https://placecats.com/300/300?t=${id}`,
			...fixtureUser,
			name,
			id: id.toString(),
			username: name.replaceAll(" ", ".").toLowerCase(),
			bot: fakeTrue(90),
			active: fakeTrue(80),
			...user,
		})
	}

	listUsers() {
		return this.users
	}
}

export const storeInit = async () => {
	const st = new GitlabStore()
	st.addUser({state: "active", bot: false})
	st.addUsers(
		Array(5)
			.fill(null)
			.map(() => ({state: "active"})),
	)

	// store.set("Query", "ROOT", {
	// 	currentUser: st.getUser(0),
	// })

	return st
}
