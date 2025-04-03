import type {User, UserCore, MergeRequest} from "@/graphql/graphql"
import {assert, repeat} from "@/lib/utils"
import {faker} from "@faker-js/faker"
import type {IMockStore, Ref} from "@graphql-tools/mock"
import {match, P} from "ts-pattern"

interface UserRepo {
	create(): Partial<UserCore> | undefined
}

export interface FakeDbConfig {
	users: number
}

/**
 * Abstraction over @graphql-tools/mock
 *
 * @see `IMockStore`
 * @see [docs](https://the-guild.dev/graphql/tools/docs/mocking)
 * @see [apollo: testing](https://www.apollographql.com/docs/apollo-server/testing/mocking)
 *
 * NOTE: guide to edging
 *
 * When using relay style pagination] _slightly_ more involved because lists
 * aren't simply connected to object, instead there's a `Connection` object,
 * containing a reference to a list of `Edge` objects - and it's these Edges
 * that contain the `node` we are interested in.
 *
 * @see [relay style pagination](https://relay.dev/graphql/connections.htm)
 * @see [apollo: relay](https://www.apollographql.com/docs/graphos/schema-design/guides/relay-style-connections)
 */
export class Db {
	constructor(
		public store: IMockStore,
		private config: FakeDbConfig,
		private userRepo: UserRepo,
	) {
		this.seed()
	}

	/** keeping id as index makes pagination easier */
	private userIdx = 0

	addUser(
		options: {withMerges?: number} = {},
		userOverrides: Partial<User> = {},
	): void {
		const store = this.store
		const id = (++this.userIdx).toString()
		const maybeUser = this.userRepo.create()
		const user = {
			...maybeUser,
			...userOverrides,
			id,
			// assignedMergeRequests: {edges: []},
			// authoredMergeRequests: {edges: []},
		}

		// store.set("MergeRequestConnection", "1", {
		// 	edges: [],
		// })
		// store.set("MergeRequestConnection", "2", {
		// 	edges: [],
		// })
		store.set("UserCore", id, user)
		this.addListEdge(
			store.get("Query", "ROOT", "users") as Ref,
			store.get("UserCore", id) as Ref,
		)

		if (options.withMerges) {
			repeat(options.withMerges, () => this.addMergeRequest(id))
		}
	}

	/**
	 * Create merge request and assign to user
	 * if `options.type` is unspecified, set to both authored and assigned
	 */
	addMergeRequest(
		userId: string,
		options: {
			connection: ("authoredMergeRequests" | "assignedMergeRequests")[]
		} = {connection: ["assignedMergeRequests", "authoredMergeRequests"]},
		mrOverrides: Partial<MergeRequest> = {},
	) {
		const store = this.store
		const id = `mr_${userId}_${faker.string.uuid()}`
		const mr: Partial<MergeRequest> = {...mrOverrides, id}
		store.set("MergeRequest", id, mr)

		const user = this.getUser(userId)

		options.connection.forEach((mrConnection) => {
			this.addListEdge(
				store.get(user, mrConnection) as Ref,
				store.get("MergeRequest", id) as Ref,
			)
		})
	}

	getUser(id: string) {
		assert(
			Number.parseInt(id) <= this.userIdx,
			`User not created yet ${id}, current userIdx ${this.userIdx}`,
		)
		return this.store.get("UserCore", id) as Ref
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
		// store.set("MergeRequestConnection", "1", {
		// 	edges: [
		// 		{node: store.get("MergeRequest", "1")},
		// 		{node: store.get("MergeRequest", "2")},
		// 	],
		// })
		// store.set("MergeRequestConnection", "2", {
		// 	edges: [
		// 		{node: store.get("MergeRequest", "1")},
		// 		{node: store.get("MergeRequest", "3")},
		// 	],
		// })

		store.set("Query", "ROOT", {
			currentUser: {
				...this.userRepo.create(),
				contributedProjects: store.get("ProjectConnection", "1"),
				assignedMergeRequests: {edges: []},
				authoredMergeRequests: {edges: []},
			},
			// important to start with an empty list, else when creating edges, users get created
			// TODO: fix this with a nicer api
			users: {edges: []},
		})

		// repeat(this.config.users, () => this.addUser({withMerges: 3}))
		repeat(this.config.users, () => this.addUser())
	}
}
