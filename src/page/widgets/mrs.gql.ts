import {graphql} from "@/graphql"

const _mrFragment = graphql(`
	fragment MrFragment on MergeRequestConnection {
		count
		pageInfo {
			hasNextPage
			endCursor
		}
		edges {
			node {
				id
				title
				webUrl
				createdAt
				draft
				mergeable
				conflicts
				userDiscussionsCount
				userNotesCount
				notes(filter: ONLY_COMMENTS) {
					nodes {
						id
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
				approvedBy {
					nodes {
						name
						avatarUrl
					}
				}
			}
		}
	}
`)
export const GetMyMrs = graphql(`
	query GetMyMrs($draft: Boolean) {
		currentUser {
			assignedMergeRequests(first: 100, draft: $draft, state: opened) {
				edges {
					node {
						title
						approvalsLeft
					}
				}
			}
			authoredMergeRequests {
				...MrFragment
			}
		}
	}
`)
