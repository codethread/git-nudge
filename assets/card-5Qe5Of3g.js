var i=Object.defineProperty;var u=(n,e,r)=>e in n?i(n,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):n[e]=r;var o=(n,e,r)=>u(n,typeof e!="symbol"?e+"":e,r);import{j as a,c as s}from"./index-DaweCC-q.js";class t extends String{constructor(r,d){super(r);o(this,"__apiType");this.value=r,this.__meta__=d}toString(){return this.value}}new t(`
    fragment Foo on ProjectConnection {
  nodes {
    id
    name
    webUrl
  }
}
    `,{fragmentName:"Foo"});const c=new t(`
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
    `,{fragmentName:"MrFragment"});new t(`
    fragment MRSmall on MergeRequest {
  id
  title
  createdAt
}
    `,{fragmentName:"MRSmall"});const l=new t(`
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
    `),m=new t(`
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
}`),g=new t(`
    query GetMyMrs {
  currentUser {
    id
    name
    authoredMergeRequests(first: 100) {
      count
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ...MRSmall
      }
    }
  }
}
    fragment MRSmall on MergeRequest {
  id
  title
  createdAt
}`),p={"\n	query GetUsers($cursor: String) {\n		users(first: 100, after: $cursor) {\n			count\n			pageInfo {\n				hasNextPage\n				endCursor\n			}\n			nodes {\n				id\n				avatarUrl\n				state\n				name\n				username\n				bot\n				webUrl\n			}\n		}\n	}\n":l,"\n	query GetMe {\n		currentUser {\n			id\n			name\n			username\n			webUrl\n			avatarUrl\n			projectMemberships(first: 100) {\n				nodes {\n					project {\n						id\n						name\n						webUrl\n						detailedImportStatus {\n							status\n						}\n					}\n				}\n			}\n			groupMemberships(first: 100) {\n				nodes {\n					group {\n						id\n						name\n						webUrl\n					}\n				}\n			}\n			contributedProjects(first: 100) {\n				count\n				...Foo\n			}\n		}\n	}\n\n	fragment Foo on ProjectConnection {\n		nodes {\n			id\n			name\n			webUrl\n		}\n	}\n":m,"\n	fragment MrFragment on MergeRequest {\n		id\n		title\n		webUrl\n		createdAt\n		draft\n		mergeable\n		conflicts\n		userDiscussionsCount\n		userNotesCount\n		notes(filter: ONLY_COMMENTS) {\n			nodes {\n				id\n				authorIsContributor\n				resolved\n			}\n		}\n		headPipeline {\n			id\n			active\n			path\n			status\n		}\n		approvalState {\n			invalidApproversRules {\n				allowMergeWhenInvalid\n				id\n				invalid\n				name\n			}\n		}\n		approved\n		approvedBy {\n			nodes {\n				name\n				avatarUrl\n			}\n		}\n	}\n":c,"\n	query GetMyMrs {\n		currentUser {\n			id\n			name\n			# projectMemberships(first: 100) {\n			# 	nodes {\n			# 		project {\n			# 			id\n			# 			name\n			# 			webUrl\n			# 		}\n			# 	}\n			# }\n			# assignedMergeRequests(first: 100, draft: $draft, state: opened) {\n			# 	count\n			# 	pageInfo {\n			# 		hasNextPage\n			# 		endCursor\n			# 	}\n			# 	# nodes {\n			# 	# 	# ...MrFragment\n			# 	# }\n			# }\n			authoredMergeRequests(first: 100) {\n				count\n				pageInfo {\n					hasNextPage\n					endCursor\n				}\n				nodes {\n					...MRSmall\n				}\n			}\n		}\n	}\n\n	fragment MRSmall on MergeRequest {\n		id\n		title\n		createdAt\n		# draft\n		# mergeable\n		# conflicts\n		# userDiscussionsCount\n		# userNotesCount\n	}\n":g};function b(n){return p[n]??{}}function v({className:n,...e}){return a.jsx("div",{"data-slot":"card",className:s("bg-card text-card-foreground gap-md py-md flex flex-col rounded-xl border shadow-sm",n),...e})}function h({className:n,...e}){return a.jsx("div",{"data-slot":"card-header",className:s("gap-sm px-md [.border-b]:pb-md @container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start has-[data-slot=card-action]:grid-cols-[1fr_auto]",n),...e})}function U({className:n,...e}){return a.jsx("div",{"data-slot":"card-title",className:s("leading-none font-semibold",n),...e})}function w({className:n,...e}){return a.jsx("div",{"data-slot":"card-content",className:s("px-md",n),...e})}export{v as C,h as a,U as b,w as c,b as g};
