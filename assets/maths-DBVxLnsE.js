var u=Object.defineProperty;var c=(e,n,r)=>n in e?u(e,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[n]=r;var d=(e,n,r)=>c(e,typeof n!="symbol"?n+"":n,r);import{j as s,c as o}from"./index-ySmlXLLv.js";class a extends String{constructor(r,i){super(r);d(this,"__apiType");this.value=r,this.__meta__=i}toString(){return this.value}}new a(`
    fragment Foo on ProjectConnection {
  nodes {
    id
    name
    webUrl
  }
}
    `,{fragmentName:"Foo"});const l=new a(`
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
    `,{fragmentName:"MrFragment"}),m=new a(`
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
    `),p=new a(`
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
}`),g=new a(`
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
    authoredMergeRequests {
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
}`),f={"\n	query GetUsers($cursor: String) {\n		users(first: 100, after: $cursor) {\n			count\n			pageInfo {\n				hasNextPage\n				endCursor\n			}\n			nodes {\n				id\n				avatarUrl\n				state\n				name\n				username\n				bot\n				webUrl\n			}\n		}\n	}\n":m,"\n	query GetMe {\n		currentUser {\n			id\n			name\n			username\n			webUrl\n			avatarUrl\n			projectMemberships(first: 100) {\n				nodes {\n					project {\n						id\n						name\n						webUrl\n						detailedImportStatus {\n							status\n						}\n					}\n				}\n			}\n			groupMemberships(first: 100) {\n				nodes {\n					group {\n						id\n						name\n						webUrl\n					}\n				}\n			}\n			contributedProjects(first: 100) {\n				count\n				...Foo\n			}\n		}\n	}\n\n	fragment Foo on ProjectConnection {\n		nodes {\n			id\n			name\n			webUrl\n		}\n	}\n":p,"\n	fragment MrFragment on MergeRequest {\n		id\n		title\n		webUrl\n		createdAt\n		draft\n		mergeable\n		conflicts\n		userDiscussionsCount\n		userNotesCount\n		notes(filter: ONLY_COMMENTS) {\n			nodes {\n				id\n				authorIsContributor\n				resolved\n			}\n		}\n		headPipeline {\n			id\n			active\n			path\n			status\n		}\n		approvalState {\n			invalidApproversRules {\n				allowMergeWhenInvalid\n				id\n				invalid\n				name\n			}\n		}\n		approved\n		approvedBy {\n			nodes {\n				name\n				avatarUrl\n			}\n		}\n	}\n":l,"\n	query GetMyMrs($draft: Boolean) {\n		currentUser {\n			id\n			name\n			projectMemberships(first: 100) {\n				nodes {\n					project {\n						id\n						name\n						webUrl\n					}\n				}\n			}\n			assignedMergeRequests(first: 100, draft: $draft, state: opened) {\n				count\n				pageInfo {\n					hasNextPage\n					endCursor\n				}\n				nodes {\n					...MrFragment\n				}\n			}\n			authoredMergeRequests {\n				count\n				pageInfo {\n					hasNextPage\n					endCursor\n				}\n				nodes {\n					...MrFragment\n				}\n			}\n		}\n	}\n":g};function v(e){return f[e]??{}}function h({className:e,...n}){return s.jsx("div",{"data-slot":"card",className:o("bg-card text-card-foreground gap-md py-md flex flex-col rounded-xl border shadow-sm",e),...n})}function U({className:e,...n}){return s.jsx("div",{"data-slot":"card-header",className:o("gap-sm px-md [.border-b]:pb-md @container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start has-[data-slot=card-action]:grid-cols-[1fr_auto]",e),...n})}function w({className:e,...n}){return s.jsx("div",{"data-slot":"card-title",className:o("leading-none font-semibold",e),...n})}function C({className:e,...n}){return s.jsx("div",{"data-slot":"card-content",className:o("px-md",e),...n})}function t(e){return e==null||Number.isNaN(e)?0:e}function N(...e){return e.reduce((n,r)=>n+t(r),0)}function x(...e){return t(e.reduce((n,r)=>n?n-t(r):r))}function j(...e){for(let n=0;n<e.length-1;n++)if(t(e[n])<=t(e[n+1]))return!1;return!0}function F(...e){return Math.min(...e.map(t))}export{h as C,U as a,w as b,N as c,C as d,j as e,v as g,F as m,x as s};
