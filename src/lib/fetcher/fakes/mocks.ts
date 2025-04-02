import type {UserState} from "@/graphql/graphql"
import type {Resolvers, Scalars} from "@/graphql/server"
import {fakeChoiceWeight, fakeTrue} from "@/lib/fetcher/fakes/fakers"
import {scalars} from "@/lib/fetcher/fakes/scalars"
import {faker} from "@faker-js/faker"
import {
	addMocksToSchema,
	relayStylePaginationMock,
	type IMocks,
} from "@graphql-tools/mock"

export const mocks: IMocks<Resolvers> = {
	Boolean: () => fakeTrue(50),
	Int: () => faker.number.int(),
	String: () => faker.word.words({count: faker.number.int({min: 3, max: 9})}),
	Time: () => faker.date.anytime(),
	ID: () => {
		// in theory this should never be used because we add users in the store
		// however it is still called, and I'm not yet sure why
		return faker.string.uuid()
	},
	UserID: () => {
		// in theory this should never be used because we add users in the store
		// however it is still called, and I'm not yet sure why
		return faker.string.uuid()
	},
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

type IMockOptions = Parameters<typeof addMocksToSchema>[0]

export function createMockedSchema({
	schema,
	store: mockStore,
}: Required<Pick<IMockOptions, "schema" | "store">>) {
	return addMocksToSchema<Resolvers>({
		schema,
		store: mockStore,
		resolvers: (store) => ({
			// ...scalars,
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

				projectMemberships: paginatedRelay(relayStylePaginationMock(store)),
				assignedMergeRequests: paginatedRelay(relayStylePaginationMock(store)),
				authoredMergeRequests: paginatedRelay(relayStylePaginationMock(store)),
			},
			// Project: {
			// 	detailedImportStatus: () => {
			// 		return {
			// 			status: "mockes",
			// 		}
			// 	},
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
