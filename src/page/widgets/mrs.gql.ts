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
		notes(last: 100, filter: ONLY_COMMENTS) {
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
		approvedBy(first: 100) {
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
			projectMemberships(first: 100) {
				nodes {
					project {
						id
						name
						webUrl
					}
				}
			}
			assignedMergeRequests(first: 100, draft: $draft, state: opened) {
				count
				pageInfo {
					hasNextPage
					endCursor
				}
				nodes {
					...MrFragment
				}
			}
			authoredMergeRequests(first: 100) {
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
