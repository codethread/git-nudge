var o=Object.defineProperty;var i=(e,n,r)=>n in e?o(e,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[n]=r;var s=(e,n,r)=>i(e,typeof n!="symbol"?n+"":n,r);class t extends String{constructor(r,a){super(r);s(this,"__apiType");this.value=r,this.__meta__=a}toString(){return this.value}}const d=new t(`
    fragment MrFragment on MergeRequest {
  id
  title
  webUrl
  createdAt
  draft
  mergeable
  conflicts
  userDiscussionsCount
  userNotesCount
  notes(first: 100, filter: ONLY_COMMENTS) {
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
  approvedBy(first: 100) {
    nodes {
      name
      avatarUrl
    }
  }
}
    `,{fragmentName:"MrFragment"}),u=new t(`
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
    `),l=new t(`
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
      nodes {
        id
        name
        webUrl
      }
    }
  }
}
    `),p=new t(`
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
    fragment MrFragment on MergeRequest {
  id
  title
  webUrl
  createdAt
  draft
  mergeable
  conflicts
  userDiscussionsCount
  userNotesCount
  notes(first: 100, filter: ONLY_COMMENTS) {
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
  approvedBy(first: 100) {
    nodes {
      name
      avatarUrl
    }
  }
}`),c={"\n	query GetUsers($cursor: String) {\n		users(first: 100, after: $cursor) {\n			count\n			pageInfo {\n				hasNextPage\n				endCursor\n			}\n			nodes {\n				id\n				avatarUrl\n				state\n				name\n				username\n				bot\n				webUrl\n			}\n		}\n	}\n":u,"\n	query GetMe {\n		currentUser {\n			id\n			name\n			username\n			webUrl\n			avatarUrl\n			projectMemberships(first: 100) {\n				nodes {\n					project {\n						id\n						name\n						webUrl\n					}\n				}\n			}\n			groupMemberships(first: 100) {\n				nodes {\n					group {\n						id\n						name\n						webUrl\n					}\n				}\n			}\n			contributedProjects(first: 100) {\n				count\n				nodes {\n					id\n					name\n					webUrl\n				}\n			}\n		}\n	}\n":l,"\n	fragment MrFragment on MergeRequest {\n		id\n		title\n		webUrl\n		createdAt\n		draft\n		mergeable\n		conflicts\n		userDiscussionsCount\n		userNotesCount\n		notes(first: 100, filter: ONLY_COMMENTS) {\n			nodes {\n				id\n				authorIsContributor\n				resolved\n			}\n		}\n		headPipeline {\n			id\n			active\n			path\n			status\n		}\n		approvalState {\n			invalidApproversRules {\n				allowMergeWhenInvalid\n				id\n				invalid\n				name\n			}\n		}\n		approved\n		approvedBy(first: 100) {\n			nodes {\n				name\n				avatarUrl\n			}\n		}\n	}\n":d,"\n	query GetMyMrs($draft: Boolean) {\n		currentUser {\n			id\n			name\n			projectMemberships(first: 100) {\n				nodes {\n					project {\n						id\n						name\n						webUrl\n					}\n				}\n			}\n			assignedMergeRequests(first: 100, draft: $draft, state: opened) {\n				count\n				pageInfo {\n					hasNextPage\n					endCursor\n				}\n				nodes {\n					...MrFragment\n				}\n			}\n			authoredMergeRequests(first: 100) {\n				count\n				pageInfo {\n					hasNextPage\n					endCursor\n				}\n				nodes {\n					...MrFragment\n				}\n			}\n		}\n	}\n":p};function g(e){return c[e]??{}}export{g};
