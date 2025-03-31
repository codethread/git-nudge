import {graphql} from "@/graphql"

export const MyBioQuery = graphql(`
	query GetMe {
		currentUser {
			id
			name
			username
			webUrl
			avatarUrl
			projectMemberships(first: 100) {
				nodes {
					project {
						id
						name
						webUrl
						detailedImportStatus {
							status
						}
					}
				}
			}
			groupMemberships(first: 100) {
				nodes {
					group {
						id
						name
						webUrl
					}
				}
			}
			contributedProjects(first: 100) {
				count
				...Foo
			}
		}
	}

	fragment Foo on ProjectConnection {
		nodes {
			id
			name
			webUrl
		}
	}
`)
