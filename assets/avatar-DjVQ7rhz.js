var y=Object.defineProperty;var S=(e,n,a)=>n in e?y(e,n,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[n]=a;var v=(e,n,a)=>S(e,typeof n!="symbol"?n+"":n,a);import{v as N,r as d,j as i,c as x,P as g,y as I,A as M,g as m}from"./index-B3eOSWLS.js";/**
 * @license lucide-react v0.482.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],O=N("RefreshCw",R);class c extends String{constructor(a,t){super(a);v(this,"__apiType");this.value=a,this.__meta__=t}toString(){return this.value}}const _=new c(`
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
    `,{fragmentName:"MrFragment"}),L=new c(`
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
    `),P=new c(`
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
    `),j=new c(`
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
}`),q={"\n	query GetUsers($cursor: String) {\n		users(first: 100, after: $cursor) {\n			count\n			pageInfo {\n				hasNextPage\n				endCursor\n			}\n			nodes {\n				id\n				avatarUrl\n				state\n				name\n				username\n				bot\n				webUrl\n			}\n		}\n	}\n":L,"\n	query GetMe {\n		currentUser {\n			id\n			name\n			username\n			webUrl\n			avatarUrl\n			projectMemberships(first: 100) {\n				nodes {\n					project {\n						id\n						name\n						webUrl\n					}\n				}\n			}\n			groupMemberships(first: 100) {\n				nodes {\n					group {\n						id\n						name\n						webUrl\n					}\n				}\n			}\n			contributedProjects(first: 100) {\n				count\n				nodes {\n					id\n					name\n					webUrl\n				}\n			}\n		}\n	}\n":P,"\n	fragment MrFragment on MergeRequest {\n		id\n		title\n		description\n		webUrl\n		createdAt\n		draft\n		mergeable\n		conflicts\n		userDiscussionsCount\n		userNotesCount\n		notes(last: 30, filter: ONLY_COMMENTS) {\n			count\n			nodes {\n				id\n				createdAt\n				url\n				body\n				author {\n					name\n					avatarUrl\n				}\n				authorIsContributor\n				resolved\n			}\n		}\n		headPipeline {\n			id\n			active\n			path\n			status\n		}\n		approvalState {\n			invalidApproversRules {\n				allowMergeWhenInvalid\n				id\n				invalid\n				name\n			}\n		}\n		approved\n		approvedBy(last: 10) {\n			nodes {\n				name\n				avatarUrl\n			}\n		}\n	}\n":_,"\n	query GetMyMrs($draft: Boolean) {\n		currentUser {\n			id\n			name\n			assignedMergeRequests(first: 50, draft: $draft, state: opened) {\n				count\n				pageInfo {\n					hasNextPage\n					endCursor\n				}\n				nodes {\n					...MrFragment\n				}\n			}\n			authoredMergeRequests(first: 50, draft: $draft, state: opened) {\n				count\n				pageInfo {\n					hasNextPage\n					endCursor\n				}\n				nodes {\n					...MrFragment\n				}\n			}\n		}\n	}\n":j};function z(e){return q[e]??{}}var p="Avatar",[F,W]=x(p),[$,h]=F(p),b=d.forwardRef((e,n)=>{const{__scopeAvatar:a,...t}=e,[s,r]=d.useState("idle");return i.jsx($,{scope:a,imageLoadingStatus:s,onImageLoadingStatusChange:r,children:i.jsx(g.span,{...t,ref:n})})});b.displayName=p;var A="AvatarImage",w=d.forwardRef((e,n)=>{const{__scopeAvatar:a,src:t,onLoadingStatusChange:s=()=>{},...r}=e,u=h(A,a),o=k(t,r.referrerPolicy),l=I(f=>{s(f),u.onImageLoadingStatusChange(f)});return M(()=>{o!=="idle"&&l(o)},[o,l]),o==="loaded"?i.jsx(g.img,{...r,ref:n,src:t}):null});w.displayName=A;var C="AvatarFallback",U=d.forwardRef((e,n)=>{const{__scopeAvatar:a,delayMs:t,...s}=e,r=h(C,a),[u,o]=d.useState(t===void 0);return d.useEffect(()=>{if(t!==void 0){const l=window.setTimeout(()=>o(!0),t);return()=>window.clearTimeout(l)}},[t]),u&&r.imageLoadingStatus!=="loaded"?i.jsx(g.span,{...s,ref:n}):null});U.displayName=C;function k(e,n){const[a,t]=d.useState("idle");return M(()=>{if(!e){t("error");return}let s=!0;const r=new window.Image,u=o=>()=>{s&&t(o)};return t("loading"),r.onload=u("loaded"),r.onerror=u("error"),r.src=e,n&&(r.referrerPolicy=n),()=>{s=!1}},[e,n]),a}var E=b,G=w,D=U;function Y({className:e,...n}){return i.jsx(E,{"data-slot":"avatar",className:m("relative flex size-8 shrink-0 overflow-hidden rounded-full",e),...n})}function H({className:e,...n}){return i.jsx(G,{"data-slot":"avatar-image",className:m("aspect-square size-full",e),...n})}function K({className:e,...n}){return i.jsx(D,{"data-slot":"avatar-fallback",className:m("bg-muted flex size-full items-center justify-center rounded-full",e),...n})}export{Y as A,O as R,H as a,K as b,z as g};
