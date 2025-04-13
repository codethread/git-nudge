import type {Note, UserState} from "@/graphql/graphql"
import type {Resolvers} from "@/graphql/server"
import {
	fakeChoiceWeight,
	fakeInt,
	fakeOption,
	fakeTrue,
} from "@/lib/fetcher/fakes/fakers"
import type {ANY_RESOLVER} from "@/lib/fetcher/fakes/utils"
import {repeat} from "@/lib/utils"
import {faker} from "@faker-js/faker"
import {
	addMocksToSchema,
	assertIsRef,
	relayStylePaginationMock,
	type IMocks,
	type IMockStore,
	type Ref,
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
		name: () => faker.commerce.productName(),
	}),
	Group: () => ({
		name: () => faker.commerce.department(),
	}),
	MergeRequest: () => ({
		title: () =>
			`${fakeOption(["fix", "feat", "hotfix", "task"])}(${faker.hacker.noun()}): ${faker.git.commitMessage()}`,
		description: () =>
			repeat(fakeInt(1, 10), () => faker.commerce.productDescription()).join(
				".\n\n",
			),
	}),
	Note: (): Partial<Note> => ({
		body: () =>
			`${faker.word.interjection()}${faker.word.words({count: {min: 3, max: 200}})}`,
	}),
}

const resolvers: (store: IMockStore) => Partial<Resolvers> = (store) => {
	const paginate = paginatedRelay(relayStylePaginationMock(store))
	const getUsers = () =>
		(store.get("Query", "ROOT", ["users", "edges"]) as Ref[]).map((edge) =>
			store.get(edge, "node"),
		) as Ref[]

	return {
		// ...scalars,
		Query: {
			users: paginate,
			currentUser: () => store.get("UserCore", "0") as Ref,
		},
		MergeRequest: {
			approvedBy: paginate,
			notes: paginate,
		},
		UserCore: {
			username: (r) => {
				assertIsRef(r)
				return (store.get(r, "name") as string)
					.toLowerCase()
					.replaceAll(/\s/g, ".")
			},
			assignedMergeRequests: paginate,
			authoredMergeRequests: paginate,
		},
		Note: {
			author: () => fakeOption(getUsers()),
		},
		CurrentUser: {
			username: (r) => {
				assertIsRef(r)
				return (store.get(r, "name") as string)
					.toLowerCase()
					.replaceAll(/\s/g, ".")
			},
			contributedProjects: paginate,
			projectMemberships: paginate,
			assignedMergeRequests: paginate,
			authoredMergeRequests: paginate,
			groupMemberships: paginate,
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
