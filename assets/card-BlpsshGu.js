var i=Object.defineProperty;var u=(e,n,r)=>n in e?i(e,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[n]=r;var o=(e,n,r)=>u(e,typeof n!="symbol"?n+"":n,r);import{j as t,c as a}from"./index-CprKEVsc.js";class s extends String{constructor(r,d){super(r);o(this,"__apiType");this.value=r,this.__meta__=d}toString(){return this.value}}const l=new s(`
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
    `,{fragmentName:"MrFragment"}),c=new s(`
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
    `),m=new s(`
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
    `),p=new s(`
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
}`),g={"\n	query GetUsers($cursor: String) {\n		users(first: 100, after: $cursor) {\n			count\n			pageInfo {\n				hasNextPage\n				endCursor\n			}\n			nodes {\n				id\n				avatarUrl\n				state\n				name\n				username\n				bot\n				webUrl\n			}\n		}\n	}\n":c,"\n	query GetMe {\n		currentUser {\n			id\n			name\n			username\n			webUrl\n			avatarUrl\n			projectMemberships(first: 100) {\n				nodes {\n					project {\n						id\n						name\n						webUrl\n					}\n				}\n			}\n			groupMemberships(first: 100) {\n				nodes {\n					group {\n						id\n						name\n						webUrl\n					}\n				}\n			}\n			contributedProjects(first: 100) {\n				count\n				nodes {\n					id\n					name\n					webUrl\n				}\n			}\n		}\n	}\n":m,"\n	fragment MrFragment on MergeRequest {\n		id\n		title\n		webUrl\n		createdAt\n		draft\n		mergeable\n		conflicts\n		userDiscussionsCount\n		userNotesCount\n		notes(first: 100, filter: ONLY_COMMENTS) {\n			nodes {\n				id\n				authorIsContributor\n				resolved\n			}\n		}\n		headPipeline {\n			id\n			active\n			path\n			status\n		}\n		approvalState {\n			invalidApproversRules {\n				allowMergeWhenInvalid\n				id\n				invalid\n				name\n			}\n		}\n		approved\n		approvedBy(first: 100) {\n			nodes {\n				name\n				avatarUrl\n			}\n		}\n	}\n":l,"\n	query GetMyMrs($draft: Boolean) {\n		currentUser {\n			id\n			name\n			projectMemberships(first: 100) {\n				nodes {\n					project {\n						id\n						name\n						webUrl\n					}\n				}\n			}\n			assignedMergeRequests(first: 100, draft: $draft, state: opened) {\n				count\n				pageInfo {\n					hasNextPage\n					endCursor\n				}\n				nodes {\n					...MrFragment\n				}\n			}\n			authoredMergeRequests(first: 100) {\n				count\n				pageInfo {\n					hasNextPage\n					endCursor\n				}\n				nodes {\n					...MrFragment\n				}\n			}\n		}\n	}\n":p};function v(e){return g[e]??{}}function b({className:e,...n}){return t.jsx("div",{"data-slot":"card",className:a("bg-card text-card-foreground gap-md py-md flex flex-col rounded-xl border shadow-sm",e),...n})}function h({className:e,...n}){return t.jsx("div",{"data-slot":"card-header",className:a("gap-sm px-md [.border-b]:pb-md @container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start has-[data-slot=card-action]:grid-cols-[1fr_auto]",e),...n})}function U({className:e,...n}){return t.jsx("div",{"data-slot":"card-title",className:a("leading-none font-semibold",e),...n})}function w({className:e,...n}){return t.jsx("div",{"data-slot":"card-content",className:a("px-md",e),...n})}export{b as C,h as a,U as b,w as c,v as g};
