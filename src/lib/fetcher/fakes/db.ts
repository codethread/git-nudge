import type {User, UserCore, MergeRequest} from "@/graphql/graphql"
import {fakeInt} from "@/lib/fetcher/fakes/fakers"
import type {SlimLogger} from "@/lib/logger"
import {assert, assertEq, repeat} from "@/lib/utils"
import {faker} from "@faker-js/faker"
import {assertIsRef, type IMockStore, type Ref} from "@graphql-tools/mock"
import {consola, createConsola} from "consola"

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
		private logger: SlimLogger,
	) {
		this.logger.info("init", config)
		this.seed()
	}

	/** keeping id as index makes pagination easier */
	private userIdx = 0

	addUser(
		options: {withMerges?: number} = {},
		userOverrides: Partial<User> = {},
	): void {
		const store = this.store
		const idx = this.userIdx++
		const id = idx.toString()
		const maybeUser = this.userRepo.create()
		const user = {
			...maybeUser,
			...userOverrides,
			assignedMergeRequests: {edges: []},
			id,
		}
		store.set("UserCore", id, user)
		const userRef = store.get("UserCore", id) as Ref
		this.logger.info("add user", user.name)

		this.addListEdge(store.get("Query", "ROOT", "users") as Ref, userRef)

		// asserts
		{
			const userNode = this.validateUserEdge(id)
			assertEq([userNode, userRef])
		}

		if (options.withMerges) {
			this.logger.debug("with merges")
			repeat(options.withMerges, () => this.addMergeRequest(userRef))
		}
	}

	validateUserEdge(id: string) {
		const idx = Number.parseInt(id)
		const edges = this.store.get("Query", "ROOT", ["users", "edges"]) as Ref[]
		assert(
			edges.length === idx + 1,
			`expected users edges length ${idx} got ${edges.length}`,
		)
		const edge = edges.at(idx) as Ref
		const node = this.store.get(edge, "node") as Ref
		assert(node, `user ${id} missing`)
		return node
	}

	/**
	 * Create merge request and assign to user
	 * if `options.type` is unspecified, set to both authored and assigned
	 */
	addMergeRequest(
		userRef: Ref,
		options: {
			connection: ("authoredMergeRequests" | "assignedMergeRequests")[]
		} = {connection: ["assignedMergeRequests", "authoredMergeRequests"]},
		mrOverrides: Partial<MergeRequest> = {},
	) {
		const store = this.store
		const userId = store.get(userRef, "id") as string
		const idx = (() => {
			try {
				return Number.parseInt(userId)
			} catch (_) {
				return null
			}
		})()
		assert(idx !== null && idx > -1, `Not a valid id ${userId}`)
		const id = `mr_${userId}_${faker.string.uuid()}`
		const mr: Partial<MergeRequest> = {...mrOverrides, id}
		store.set("MergeRequest", id, mr)
		this.logger.info("adding mr", id)

		options.connection.forEach((mrConnection) => {
			const connection = store.get(userRef, mrConnection) as Ref
			this.logger.debug("merge connection", connection)
			this.addListEdge(connection, store.get("MergeRequest", id) as Ref)
		})
	}

	getUser(id: string) {
		assert(
			Number.parseInt(id) <= this.userIdx,
			`User not created yet ${id}, current userIdx ${this.userIdx}`,
		)
		const ref = this.store.get("UserCore", id)
		assertIsRef(ref)
		return ref
	}

	addMrToUser(id = "0") {
		const userRef = this.getUser(id)
		this.addMergeRequest(userRef, {connection: ["assignedMergeRequests"]})
	}

	/**
	 * credit:
	 * - https://github.com/woocoos/adminx-ui/blob/20155c0e42e7aa61c5d6d22f6e54040fca008658/mock/graphql/adminx/store.ts#L29C29-L29C70
	 * - https://github.com/woocoos/msgcenter/blob/ce64a08fb56ada9cdb6cd03a289166a64f26c66a/web/mock/graphql/msgsrv/server.ts#L2
	 */
	private addListEdge(paginatedRef: Ref, node: Ref) {
		const store = this.store
		const typeNameEdge = `${node.$ref.typeName}Edge`
		const edgeKey = `${node.$ref.key}`

		this.logger.debug("adding edge", {typeNameEdge, edgeKey}, node)
		store.set(typeNameEdge, edgeKey, "node", node)

		const edgesRef = store.get(paginatedRef, "edges") as Ref[]
		edgesRef.push(store.get(typeNameEdge, edgeKey) as Ref)

		store.set(paginatedRef, "edges", edgesRef)
		store.set(paginatedRef, "count", edgesRef.length)

		return node
	}

	private createCurrentUser() {
		const store = this.store
		const id = "0"
		this.logger.info("creating currentUser")
		const userRef = this.getUser(id)

		store.set("Project", "1", {name: "Bigger Project"})
		store.set("Project", "2", {name: "Big Project"})

		store.set("ProjectConnection", "1", {
			edges: [
				{node: store.get("Project", "1")},
				{node: store.get("Project", "2")},
			],
		})

		// store.set("Query", "ROOT", "currentUser", userRef)
		store.set(userRef, {
			projectMemberships: store.get("ProjectConnection", "1"),
			authoredMergeRequests: {edges: []},
			assignedMergeRequests: {edges: []},
		})
		this.logger.debug("success currentUser")

		// add some MRs
		repeat(fakeInt(2, 4), () =>
			this.addMergeRequest(userRef, {connection: ["authoredMergeRequests"]}),
		)
		repeat(fakeInt(1, 2), () =>
			this.addMergeRequest(userRef, {connection: ["assignedMergeRequests"]}),
		)
		repeat(fakeInt(2, 4), () => this.addMergeRequest(userRef))
	}

	private seed() {
		// important to start with an empty list, else when creating edges, users get created
		const l = this.logger
		l.group("seed")
		this.store.set("Query", "ROOT", {users: {edges: []}})
		// this.createCurrentUser()
		repeat(this.config.users, () => this.addUser())
		this.createCurrentUser()
		l.groupEnd()
	}
}
