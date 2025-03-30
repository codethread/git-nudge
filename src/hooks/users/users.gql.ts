import {graphql} from "@/graphql"

// TODO: right now a blunt hammer, can offer more control if needed
export const UsersQuery = graphql(`
	query GetUsers($cursor: String) {
		users(first: 100, after: $cursor) {
			count
			pageInfo {
				hasNextPage
				endCursor
			}
			nodes {
				id
				avatarUrl
				state
				name
				username
				bot
				webUrl
			}
		}
	}
`)
