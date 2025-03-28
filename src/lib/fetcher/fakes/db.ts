import type {CurrentUser, UserCore} from "@/graphql/graphql"
import {fakeTrue, getFakeUserFactory} from "@/lib/fetcher/fakes/fakers"
import {faker} from "@faker-js/faker"

type UserBase = Partial<UserCore | CurrentUser>

class FakeLabUsers {
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
			bot: fakeTrue(10),
			active: fakeTrue(80),
			...user,
		})
	}

	listUsers() {
		return this.users
	}
}

export const fakeDBInit = async () => {
	const fl = new FakeLabUsers()
	fl.addUser({state: "active", bot: false})

	fl.addUsers(Array(120).map(() => ({state: "active"})))

	return fl
}
