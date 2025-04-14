import {graphql} from "@/graphql"
import type {GetMyMrsQuery, MrFragmentFragment} from "@/graphql/graphql"

export type MyMrs = MaybeNot<GetMyMrsQuery>
export type MyCurrentUser = NN<MaybeNot<GetMyMrsQuery>["currentUser"]>
export type MyMr = MaybeNot<MrFragmentFragment>

graphql(`
	fragment MrFragment on MergeRequest {
		id
		title
		description
		webUrl
		createdAt
		draft
		mergeable
		conflicts
		userDiscussionsCount
		userNotesCount
		notes(last: 30, filter: ONLY_COMMENTS) {
			count
			nodes {
				id
				createdAt
				url
				body
				author {
					name
					avatarUrl
				}
				authorIsContributor
				resolved
			}
		}
		headPipeline {
			id
			active
			path
			status
		}
		approvalState {
			invalidApproversRules {
				allowMergeWhenInvalid
				id
				invalid
				name
			}
		}
		approved
		approvedBy(last: 10) {
			nodes {
				name
				avatarUrl
			}
		}
	}
`)

export const GetMyMrs = graphql(`
	query GetMyMrs($draft: Boolean) {
		currentUser {
			id
			name
			assignedMergeRequests(first: 50, draft: $draft, state: opened) {
				count
				pageInfo {
					hasNextPage
					endCursor
				}
				nodes {
					...MrFragment
				}
			}
			authoredMergeRequests(first: 50, draft: $draft, state: opened) {
				count
				pageInfo {
					hasNextPage
					endCursor
				}
				nodes {
					...MrFragment
				}
			}
		}
	}
`)
