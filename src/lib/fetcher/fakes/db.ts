import type {User, UserCore} from "@/graphql/graphql"
import {repeat} from "@/lib/utils"
import type {IMockStore, Ref} from "@graphql-tools/mock"

interface UserRepo {
	create(): Partial<UserCore> | undefined
}

interface Config {
	users: number
}

/**
 * Abstraction over @graphql-tools/mock
 *
 * @see `IMockStore`
 * @see [docs](https://the-guild.dev/graphql/tools/docs/mocking)
 * @see [apollo](https://www.apollographql.com/docs/apollo-server/testing/mocking)
 */
export class Db {
	constructor(
		public store: IMockStore,
		private config: Config,
		private userRepo: UserRepo,
	) {
		this.seed()
	}

	// 	/** keeping id as index makes pagination easier */
	private userIdx = 0

	addUser(userOverrides: Partial<User> = {}): void {
		const id = (++this.userIdx).toString()
		const maybeUser = this.userRepo.create()
		const user = {
			...maybeUser,
			...userOverrides,
			id,
		}
		this.store.set("UserCore", id, user)
		this.addListEdge(
			this.store.get("Query", "ROOT", "users") as Ref,
			this.store.get("UserCore", id) as Ref,
		)
	}

	/**
	 * credit:
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

	private seed() {
		const store = this.store
		store.set("Project", "1", {name: "Bigger Project"})
		store.set("Project", "2", {name: "Big Project"})

		store.set("ProjectConnection", "1", {
			edges: [
				{node: store.get("Project", "1")},
				{node: store.get("Project", "2")},
			],
		})

		store.set("Query", "ROOT", {
			currentUser: {
				...this.userRepo.create(),
				contributedProjects: store.get("ProjectConnection", "1"),
			},
			// important to start with an empty list, else when creating edges, users get created
			// TODO: fix this with a nicer api
			users: {edges: []},
		})

		repeat(this.config.users, () => this.addUser())

		//
	}
}
