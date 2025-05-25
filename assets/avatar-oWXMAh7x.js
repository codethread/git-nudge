const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/fake-hoFMkJu7.js","assets/index-Blh_3CCp.js","assets/index-CsQcuQ_S.css","assets/maths-Bni7feuY.js"])))=>i.map(i=>d[i]);
var O=Object.defineProperty;var $=(t,e,n)=>e in t?O(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var S=(t,e,n)=>$(t,typeof e!="symbol"?e+"":e,n);import{q as D,R as h,v as I,w as G,z as _,x as N,r as f,j as i,y as B,n as z,_ as y,A as b,m as V,p as Y,b as K,P as w,C as W,D as U,c as C}from"./index-Blh_3CCp.js";import{u as H}from"./useQuery-CJtX6N2R.js";/**
 * @license lucide-react v0.482.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],be=D("RefreshCw",Q);function J(t){const e=new Set,n=new Map;let r,a,s=!0;const o=()=>{s||(s=!0,e.forEach(d=>d(r,r)))};return{getState:()=>{if(!s)return r;if(!a||Array.from(a).some(([d,c])=>!Object.is(d.getState(),c))){const d=new Map;r=t(l=>{if(!l)return r;const v=l.getState();return d.set(l,v),v}),a=d}if(e.size){const d=new Set(a.keys());n.forEach((c,l)=>{d.has(l)?d.delete(l):(c(),n.delete(l))}),d.forEach(c=>{n.set(c,c.subscribe(o))}),s=!1}return r},subscribe:d=>(e.add(d),()=>{e.delete(d),e.size||(n.forEach(c=>c()),n.clear(),s=!0)}),getInitialState:()=>{throw new Error("getInitialState is not available in derived store")},setState:()=>{throw new Error("setState is not available in derived store")},destroy:()=>{throw new Error("destory is not available in derived store")}}}function X(t){return J(e=>{const n=e(t),r={myMRsRefreshRate:{amount:5,unit:"mins"}};return _(n).returnType().with({gitlab:{state:"ready"}},a=>({gitlab:{domain:a.gitlab.domain,user:a.gitlab.user},isFakeLab:n.fakeLab,...r})).with({fakeLab:!0},()=>({gitlab:{domain:"fakelab.io",user:"test.user"},isFakeLab:!0,...r})).with({gitlab:{state:"init"}},()=>{throw new Error("ConfigStore expected to be given an initialsed config")}).exhaustive()})}const L=h.createContext(null);function Z(){return G({configContext:L})}function he(t){const e=Z();return I(e,t)}function x({children:t}){const e=N(),n=f.useRef(X(e)).current;return i.jsx(L.Provider,{value:n,children:t})}const ee=(t,e)=>(...n)=>Object.assign({},t,e(...n)),P=h.createContext(null);function we(){const t=h.useContext(P);if(!t)throw new Error("useFetcher must be used inside FetcherProvider");return t}const te=B(ee({users:37},t=>({setUsers:e=>t({users:e})}))),ne=()=>I(te);function A({children:t,withFake:e,reqConf:n}){const r=f.useMemo(()=>e?Math.random():!1,[e]),{users:a,setUsers:s}=ne(),{data:o,error:u,isPending:g,isSuccess:m}=H({retry:e?0:3,staleTime:Number.POSITIVE_INFINITY,refetchOnMount:!1,refetchInterval:Number.POSITIVE_INFINITY,queryKey:["fetcher",r,n,a],queryFn:async({queryKey:[d,c,l,v]})=>{const{createFetcher:T}=await(c?y(()=>import("./fake-hoFMkJu7.js"),__vite__mapDeps([0,1,2,3])):y(()=>import("./web-Bb3NCwBK.js"),[]));return T(l,{dbConfig:{users:v}})}});if(u)throw u;if(g)return i.jsx(z,{});if(!m)throw new Error("FetcherProvider failed");return i.jsx(P.Provider,{value:o,children:t})}function Ce({children:t}){const e=N(),n=b(o=>o.fakeLab),r=b(o=>o.gitlab),a=b(o=>o.global.requestTimeoutMillis),s=V().logger;return _({isFakeLab:n,gitlabConf:r}).with({isFakeLab:!1,gitlabConf:{state:"init"}},()=>i.jsx(Y,{to:"/login"})).with({isFakeLab:!1,gitlabConf:{state:"ready"}},({gitlabConf:{domain:o,token:u}})=>i.jsx(x,{appConfigStore:e,children:i.jsx(A,{reqConf:{domain:o,token:u,timeout:a,logger:s},children:t})})).with({isFakeLab:!0},()=>i.jsx(x,{appConfigStore:e,children:i.jsx(A,{withFake:!0,reqConf:{domain:"",token:"",timeout:a,logger:s},children:t})})).exhaustive()}class p extends String{constructor(n,r){super(n);S(this,"__apiType");this.value=n,this.__meta__=r}toString(){return this.value}}const re=new p(`
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
    `,{fragmentName:"MrFragment"}),ae=new p(`
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
    `),se=new p(`
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
    `),oe=new p(`
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
}`),ie={"\n	query GetUsers($cursor: String) {\n		users(first: 100, after: $cursor) {\n			count\n			pageInfo {\n				hasNextPage\n				endCursor\n			}\n			nodes {\n				id\n				avatarUrl\n				state\n				name\n				username\n				bot\n				webUrl\n			}\n		}\n	}\n":ae,"\n	query GetMe {\n		currentUser {\n			id\n			name\n			username\n			webUrl\n			avatarUrl\n			projectMemberships(first: 100) {\n				nodes {\n					project {\n						id\n						name\n						webUrl\n					}\n				}\n			}\n			groupMemberships(first: 100) {\n				nodes {\n					group {\n						id\n						name\n						webUrl\n					}\n				}\n			}\n			contributedProjects(first: 100) {\n				count\n				nodes {\n					id\n					name\n					webUrl\n				}\n			}\n		}\n	}\n":se,"\n	fragment MrFragment on MergeRequest {\n		id\n		title\n		description\n		webUrl\n		createdAt\n		draft\n		mergeable\n		conflicts\n		userDiscussionsCount\n		userNotesCount\n		notes(last: 30, filter: ONLY_COMMENTS) {\n			count\n			nodes {\n				id\n				createdAt\n				url\n				body\n				author {\n					name\n					avatarUrl\n				}\n				authorIsContributor\n				resolved\n			}\n		}\n		headPipeline {\n			id\n			active\n			path\n			status\n		}\n		approvalState {\n			invalidApproversRules {\n				allowMergeWhenInvalid\n				id\n				invalid\n				name\n			}\n		}\n		approved\n		approvedBy(last: 10) {\n			nodes {\n				name\n				avatarUrl\n			}\n		}\n	}\n":re,"\n	query GetMyMrs($draft: Boolean) {\n		currentUser {\n			id\n			name\n			assignedMergeRequests(first: 50, draft: $draft, state: opened) {\n				count\n				pageInfo {\n					hasNextPage\n					endCursor\n				}\n				nodes {\n					...MrFragment\n				}\n			}\n			authoredMergeRequests(first: 50, draft: $draft, state: opened) {\n				count\n				pageInfo {\n					hasNextPage\n					endCursor\n				}\n				nodes {\n					...MrFragment\n				}\n			}\n		}\n	}\n":oe};function Me(t){return ie[t]??{}}var M="Avatar",[ue,Se]=K(M),[de,R]=ue(M),F=f.forwardRef((t,e)=>{const{__scopeAvatar:n,...r}=t,[a,s]=f.useState("idle");return i.jsx(de,{scope:n,imageLoadingStatus:a,onImageLoadingStatusChange:s,children:i.jsx(w.span,{...r,ref:e})})});F.displayName=M;var E="AvatarImage",j=f.forwardRef((t,e)=>{const{__scopeAvatar:n,src:r,onLoadingStatusChange:a=()=>{},...s}=t,o=R(E,n),u=ce(r,s.referrerPolicy),g=W(m=>{a(m),o.onImageLoadingStatusChange(m)});return U(()=>{u!=="idle"&&g(u)},[u,g]),u==="loaded"?i.jsx(w.img,{...s,ref:e,src:r}):null});j.displayName=E;var k="AvatarFallback",q=f.forwardRef((t,e)=>{const{__scopeAvatar:n,delayMs:r,...a}=t,s=R(k,n),[o,u]=f.useState(r===void 0);return f.useEffect(()=>{if(r!==void 0){const g=window.setTimeout(()=>u(!0),r);return()=>window.clearTimeout(g)}},[r]),o&&s.imageLoadingStatus!=="loaded"?i.jsx(w.span,{...a,ref:e}):null});q.displayName=k;function ce(t,e){const[n,r]=f.useState("idle");return U(()=>{if(!t){r("error");return}let a=!0;const s=new window.Image,o=u=>()=>{a&&r(u)};return r("loading"),s.onload=o("loaded"),s.onerror=o("error"),s.src=t,e&&(s.referrerPolicy=e),()=>{a=!1}},[t,e]),n}var le=F,fe=j,ge=q;function ye({className:t,...e}){return i.jsx(le,{"data-slot":"avatar",className:C("relative flex size-8 shrink-0 overflow-hidden rounded-full",t),...e})}function xe({className:t,...e}){return i.jsx(fe,{"data-slot":"avatar-image",className:C("aspect-square size-full",t),...e})}function Ae({className:t,...e}){return i.jsx(ge,{"data-slot":"avatar-fallback",className:C("bg-muted flex size-full items-center justify-center rounded-full",t),...e})}export{ye as A,be as R,xe as a,Ae as b,we as c,Ce as d,Me as g,he as u};
