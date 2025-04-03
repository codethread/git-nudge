import type {UserState} from "@/graphql/graphql"
import type {Resolvers} from "@/graphql/server"
import {fakeChoiceWeight, fakeTrue} from "@/lib/fetcher/fakes/fakers"
import type {ANY_RESOLVER} from "@/lib/fetcher/fakes/utils"
import {faker} from "@faker-js/faker"
import {
	addMocksToSchema,
	assertIsRef,
	relayStylePaginationMock,
	type IMocks,
	type IMockStore,
} from "@graphql-tools/mock"

const uuidFn = faker.string.uuid
export const mocks: IMocks<Resolvers> = {
	String: () => faker.word.words({count: faker.number.int({min: 3, max: 9})}),
	ID: uuidFn,

	Time: () =>
		faker.date.past({refDate: "2020-01-01T00:00:00.000Z"}).toISOString(),

	GlobalID: uuidFn,
	NoteID: uuidFn,
	UserID: uuidFn,
	ProjectImportStateID: uuidFn,

	UserCore: () => ({
		state: () => fakeChoiceWeight<UserState>(["active", 70], [undefined]),
		bot: () => fakeTrue(20),
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

const resolvers: (store: IMockStore) => Partial<Resolvers> = (store) => {
	const paginate = paginatedRelay(relayStylePaginationMock(store))
	return {
		// ...scalars,
		Query: {
			users: paginate,
			currentUser: () => {
				const u = store.get("UserCore", "0")
				debugger
				return u
			},
		},
		MergeRequest: {
			approvedBy: paginate,
		},
		UserCore: {
			username: (r) => {
				console.log("codethread", "hit")
				assertIsRef(r)
				return (store.get(r, "name") as string)
					.toLowerCase()
					.replaceAll(/\s/g, ".")
			},
			// assignedMergeRequests: paginatedRelay(relayStylePaginationMock(store)),
			// authoredMergeRequests: paginatedRelay(relayStylePaginationMock(store)),
		},
		CurrentUser: {
			// username: (r) => {
			// 	console.log("codethread", "hit")
			// 	assertIsRef(r)
			// 	return (store.get(r, "name") as string)
			// 		.toLowerCase()
			// 		.replaceAll(/\s/g, ".")
			// },
			contributedProjects: paginate,
			projectMemberships: paginate,
			assignedMergeRequests: paginate,
			authoredMergeRequests: paginate,
			groupMemberships: paginate,
			// },
			// Project: {
			// 	detailedImportStatus: () => {
			// 		return {
			// 			status: "mockes",
			// 		}
			// 	},
		},
	}
}

export const resolverImplemntationMap = resolvers({} as ANY_TRUST_ME)

type IMockOptions = Parameters<typeof addMocksToSchema<Resolvers>>[0]

export function createMockedSchema({
	schema,
	store: mockStore,
}: Required<Pick<IMockOptions, "schema" | "store">>) {
	return addMocksToSchema<Resolvers>({
		schema,
		store: mockStore,
		resolvers,
	})
}

type Resolver = ReturnType<typeof relayStylePaginationMock>
/**
 * GitLab doesn't quite follow relay, so we adapt
 */
function paginatedRelay(fn: Resolver): ANY_RESOLVER {
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
