import type {Resolvers} from "@/graphql/server"
import {faker} from "@faker-js/faker"
import {
	addMocksToSchema,
	relayStylePaginationMock,
	type IMocks,
} from "@graphql-tools/mock"

export const mocks: IMocks<Resolvers> = {
	String: () => faker.word.words({count: faker.number.int({min: 3, max: 9})}),
	UserID: () => {
		// in theory this should never be used because we add users in the store
		// however it is still called, and I'm not yet sure why
		return faker.string.uuid()
	},
	UserCore: () => ({
		avatarUrl: () => "https://placecats.com/300/300",
		webUrl: () => "https://gitlab.com",
	}),
	CurrentUser: () => ({
		avatarUrl: () => "https://placecats.com/200/200",
		webUrl: () => "https://gitlab.com",
	}),
	Project: () => ({
		name: () => {
			return faker.commerce.productName()
		},
		detailedImportStatus: () => {
			return {status: "some import "}
		},
	}),
	Group: () => ({
		name: () => faker.commerce.department(),
	}),
	MergeRequest: () => ({
		title: () => faker.commerce.productDescription(),
	}),
}

type IMockOptions = Parameters<typeof addMocksToSchema>[0]

export function createMockedSchema({
	schema,
	store: mockStore,
}: Required<Pick<IMockOptions, "schema" | "store">>) {
	return addMocksToSchema<Resolvers>({
		schema,
		store: mockStore,
		resolvers: (store) => ({
			Query: {
				users: paginatedRelay(relayStylePaginationMock(store)),
			},
			UserCore: {
				username: (r) =>
					(store.get(r, "name") as string).toLowerCase().replaceAll(/\s/g, "."),
			},
			CurrentUser: {
				username: (r) =>
					(store.get(r, "name") as string).toLowerCase().replaceAll(/\s/g, "."),
				contributedProjects: paginatedRelay(relayStylePaginationMock(store)),
			},
			// Query: {
			// 	echo: () => faker.word.words({count: {min: 3, max: 8}}),
			// 	currentUser: (_, __, {db}) => {
			// 		debugger
			// 		return db.getUsers().find((u) => u.active)
			// 	},
			// 	users: (_, params, {db}) => {
			// 		const DEFAULT_PAGE_SIZE = 100 // for GitLab
			// 		const {after, first} = params
			//
			// 		if (params.last || params.before) throw new Error("no mock setup")
			//
			// 		const allUsers = db.getUsers()
			// 		const idx = Number.parseInt(after || "0", 10)
			// 		const users = allUsers.slice(idx, (first || DEFAULT_PAGE_SIZE) + idx)
			// 		const lastUser = users.at(-1)
			//
			// 		return {
			// 			count: allUsers.length,
			// 			nodes: users as ANY_RESOLVER,
			// 			pageInfo: {
			// 				hasNextPage: lastUser?.id < allUsers.length,
			// 				endCursor: lastUser?.id || after,
			// 				hasPreviousPage: false, // not using
			// 			},
			// 		}
			// 	},
			// },
			// Project: {
			// 	detailedImportStatus: () => {
			// 		return {
			// 			status: "mockes",
			// 		}
			// 	},
			// },
			// CurrentUser: {
			// 	id: () => {
			// 		debugger
			// 	},
			// 	projectMemberships: paginated(fakeInt(0, 3)),
			// 	groupMemberships: paginated(fakeInt(1, 8)),
			// 	contributedProjects: paginated(fakeInt(4, 9)),
			// 	assignedMergeRequests: paginated(fakeInt(2, 8)),
			// 	authoredMergeRequests: paginated(fakeInt(1, 3)),
			// },
		}),
	})
}

type Resolver = ReturnType<typeof relayStylePaginationMock>
/**
 * GitLab doesn't quite follow relay, so we adapt
 */
function paginatedRelay(fn: Resolver) {
	const cb: Resolver = (...args) => {
		const page = fn(...args)
		return {
			...page,
			count: page.totalCount,
			nodes: page.edges.map((e: {node: string}) => e.node),
		}
	}
	return cb
}

// LATER
//
// users: (_, params, {db}) => {
// 	const DEFAULT_PAGE_SIZE = 100 // for GitLab
// 	const {after, first} = params
//
// 	if (params.last || params.before) throw new Error("no mock setup")
//
// 	const allUsers = db.getUsers()
// 	const idx = Number.parseInt(after || "0", 10)
// 	const users = allUsers.slice(idx, (first || DEFAULT_PAGE_SIZE) + idx)
// 	const lastUser = users.at(-1)
//
// 	return {
// 		count: allUsers.length,
// 		nodes: users as ANY_RESOLVER,
// 		pageInfo: {
// 			hasNextPage: lastUser?.id < allUsers.length,
// 			endCursor: lastUser?.id || after,
// 			hasPreviousPage: false, // not using
// 		},
// 	}
// },
