import type {CurrentUser, UserCore, Scalars} from "@/graphql/graphql"
import {faker} from "@faker-js/faker"
import type {IMockStore, Ref} from "@graphql-tools/mock"

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
	// CurrentUser: () => {
	// 	const name = faker.person.fullName()
	// 	return {
	// 		username: () => name.replaceAll(" ", ".").toLowerCase(),
	// 		name: () => name,
	// 		avatarUrl: () => "https://placecats.com/200/200",
	// 	}
	// },
}

export const mocks = {...scalars, ...objects}

class GitlabStore {
	constructor(public store: IMockStore) {}

	private userIdx = 0

	getUser(id: number) {
		return this.store.get("UserCore", id.toString())
	}

	addUsers(users: Partial<UserCore>[]) {
		for (const user of users) {
			this.addUser(user)
		}
	}

	addUser(user?: Partial<UserCore>) {
		const name = user?.name ?? faker.person.fullName()
		const _user: Partial<UserCore> = {
			...user,
			name,
			username: name.replaceAll(" ", ".").toLowerCase(),
		}
		const id = (this.userIdx++).toString()

		this.store.set("UserCore", id, _user)
		this.addListEdge(
			this.store.get("Query", "ROOT", "users") as Ref,
			this.store.get("UserCore", id) as Ref,
		)
	}

	/**
	 * could not get my head around edging, full credit:
	 * - https://github.com/woocoos/adminx-ui/blob/20155c0e42e7aa61c5d6d22f6e54040fca008658/mock/graphql/adminx/store.ts#L29C29-L29C70
	 * - https://github.com/woocoos/msgcenter/blob/ce64a08fb56ada9cdb6cd03a289166a64f26c66a/web/mock/graphql/msgsrv/server.ts#L2
	 */
	private addListEdge(ref: Ref, addData: Ref) {
		const store = this.store
		const typeNameEdge = `${addData.$ref.typeName}Edge`
		const edgeKey = `${addData.$ref.key}`

		store.set(typeNameEdge, edgeKey, "node", addData)

		const edgesRef = store.get(ref, "edges") as Ref[]
		edgesRef.push(store.get(typeNameEdge, edgeKey) as Ref)

		store.set(ref, "edges", edgesRef)
		store.set(ref, "count", edgesRef.length)

		return addData
	}

	listUsers() {
		return this.store.get("Query", "ROOT", "users")
	}
}

// @refresh reset
export const storeInit = (store: IMockStore) => {
	const st = new GitlabStore(store)
	st.addUser({name: "Billy Bob", state: "active", bot: false})
	st.addUsers(Array(5))

	store.set("Query", "ROOT", {
		currentUser: st.getUser(0),
	})

	window._store = st
}
