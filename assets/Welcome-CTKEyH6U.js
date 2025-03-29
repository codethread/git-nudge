var ee=Object.defineProperty;var re=(e,r,a)=>r in e?ee(e,r,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[r]=a;var L=(e,r,a)=>re(e,typeof r!="symbol"?r+"":r,a);import{Q as te,i as _,k as ae,l as se,m as ne,r as d,j as t,n as k,P as N,o as oe,p as q,q as h,s as M,t as ie,v as le,b as ce,N as ue,S as de,T as p,w as E,e as fe,B as me,x as ge,h as A,d as T}from"./index-hzOygJc6.js";var he=class extends te{constructor(e,r){super(e,r)}bindMethods(){super.bindMethods(),this.fetchNextPage=this.fetchNextPage.bind(this),this.fetchPreviousPage=this.fetchPreviousPage.bind(this)}setOptions(e,r){super.setOptions({...e,behavior:_()},r)}getOptimisticResult(e){return e.behavior=_(),super.getOptimisticResult(e)}fetchNextPage(e){return this.fetch({...e,meta:{fetchMore:{direction:"forward"}}})}fetchPreviousPage(e){return this.fetch({...e,meta:{fetchMore:{direction:"backward"}}})}createResult(e,r){var j,I;const{state:a}=e,s=super.createResult(e,r),{isFetching:n,isRefetching:o,isError:i,isRefetchError:l}=s,c=(I=(j=a.fetchMeta)==null?void 0:j.fetchMore)==null?void 0:I.direction,f=i&&c==="forward",x=n&&c==="forward",u=i&&c==="backward",m=n&&c==="backward";return{...s,fetchNextPage:this.fetchNextPage,fetchPreviousPage:this.fetchPreviousPage,hasNextPage:se(r,a.data),hasPreviousPage:ae(r,a.data),isFetchNextPageError:f,isFetchingNextPage:x,isFetchPreviousPageError:u,isFetchingPreviousPage:m,isRefetchError:l&&!f&&!u,isRefetching:o&&!x&&!m}}};function xe(e,r){return ne(e,he)}var S="Avatar",[ve,Ze]=k(S),[pe,B]=ve(S),G=d.forwardRef((e,r)=>{const{__scopeAvatar:a,...s}=e,[n,o]=d.useState("idle");return t.jsx(pe,{scope:a,imageLoadingStatus:n,onImageLoadingStatusChange:o,children:t.jsx(N.span,{...s,ref:r})})});G.displayName=S;var D="AvatarImage",Q=d.forwardRef((e,r)=>{const{__scopeAvatar:a,src:s,onLoadingStatusChange:n=()=>{},...o}=e,i=B(D,a),l=je(s,o.referrerPolicy),c=oe(f=>{n(f),i.onImageLoadingStatusChange(f)});return q(()=>{l!=="idle"&&c(l)},[l,c]),l==="loaded"?t.jsx(N.img,{...o,ref:r,src:s}):null});Q.displayName=D;var V="AvatarFallback",W=d.forwardRef((e,r)=>{const{__scopeAvatar:a,delayMs:s,...n}=e,o=B(V,a),[i,l]=d.useState(s===void 0);return d.useEffect(()=>{if(s!==void 0){const c=window.setTimeout(()=>l(!0),s);return()=>window.clearTimeout(c)}},[s]),i&&o.imageLoadingStatus!=="loaded"?t.jsx(N.span,{...n,ref:r}):null});W.displayName=V;function je(e,r){const[a,s]=d.useState("idle");return q(()=>{if(!e){s("error");return}let n=!0;const o=new window.Image,i=l=>()=>{n&&s(l)};return s("loading"),o.onload=i("loaded"),o.onerror=i("error"),o.src=e,r&&(o.referrerPolicy=r),()=>{n=!1}},[e,r]),a}var be=G,Ne=Q,Pe=W;function we({className:e,...r}){return t.jsx(be,{"data-slot":"avatar",className:h("relative flex size-8 shrink-0 overflow-hidden rounded-full",e),...r})}function ye({className:e,...r}){return t.jsx(Ne,{"data-slot":"avatar-image",className:h("aspect-square size-full",e),...r})}function Ue({className:e,...r}){return t.jsx(Pe,{"data-slot":"avatar-fallback",className:h("bg-muted flex size-full items-center justify-center rounded-full",e),...r})}class z extends String{constructor(a,s){super(a);L(this,"__apiType");this.value=a,this.__meta__=s}toString(){return this.value}}const Me=new z(`
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
    `),Ae=new z(`
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
    `),Se={"\n	query GetUsers($cursor: String) {\n		users(first: 100, after: $cursor) {\n			count\n			pageInfo {\n				hasNextPage\n				endCursor\n			}\n			nodes {\n				id\n				avatarUrl\n				state\n				name\n				username\n				bot\n				webUrl\n			}\n		}\n	}\n":Me,"\n	query GetMe {\n		currentUser {\n			id\n			name\n			username\n			webUrl\n			avatarUrl\n			projectMemberships(first: 100) {\n				nodes {\n					project {\n						id\n						name\n						webUrl\n					}\n				}\n			}\n			groupMemberships(first: 100) {\n				nodes {\n					group {\n						id\n						name\n						webUrl\n					}\n				}\n			}\n			contributedProjects(first: 100) {\n				count\n				nodes {\n					id\n					name\n					webUrl\n				}\n			}\n		}\n	}\n":Ae};function K(e){return Se[e]??{}}const Ce=K(`
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
`),Re=()=>{const e=M(),r=xe({staleTime:ie(1,"days"),refetchOnMount:!1,refetchOnWindowFocus:!1,queryKey:["usersAll"],initialPageParam:"",queryFn:({pageParam:a})=>e(Ce,{cursor:a}),getNextPageParam:({users:a})=>{var s;return a!=null&&a.pageInfo.hasNextPage?(s=a==null?void 0:a.pageInfo)==null?void 0:s.endCursor:null}});return d.useEffect(()=>{r.hasNextPage&&r.fetchNextPage()},[r]),d.useMemo(()=>{var x,u;const{error:a,data:s,isFetching:n}=r,o=((u=(x=s==null?void 0:s.pages.at(0))==null?void 0:x.users)==null?void 0:u.count)??0,i=s==null?void 0:s.pages.map(m=>{var v,j;return((j=(v=m.users)==null?void 0:v.nodes)==null?void 0:j.length)??0}).reduce((m,v)=>m+v),l=(i?i/o:0)*100,c=l===100,f=s&&c?s.pages.flatMap(m=>{var v;return(v=m.users)==null?void 0:v.nodes}).filter(Boolean):[];return{error:a,progress:l,isFetching:n,allFetched:c,allUsers:f,users:f.filter(m=>!m.bot&&m.state==="active")}},[r])};function w(e){var n;const r=le(o=>o.gitlab.domain),a=ce(e).with({loading:!0},()=>{}).with({user:ue.select()},o=>o).exhaustive(),s=(n=a==null?void 0:a.avatarUrl)==null?void 0:n.replace(/^\//,`https://${r}/`);return t.jsxs("div",{className:h("flex items-center space-x-4",e.className),children:[a!=null&&a.avatarUrl?t.jsxs(we,{className:"hover:outline-accent-foreground h-10 w-10 outline outline-offset-1 transition hover:outline-2",children:[t.jsx(ye,{src:s}),t.jsx(Ue,{className:"text-xl",children:a.username.slice(0,2)})]}):t.jsx(de,{className:"h-10 w-10 rounded-full"}),a?t.jsxs("div",{children:[t.jsx(p,{flush:!0,children:a.name}),t.jsx("div",{className:"flex",children:t.jsxs(p,{flush:!0,children:[t.jsx("span",{className:"text-muted-foreground",children:a.state}),a.username===a.name?"":` ${a.username}`]})})]}):t.jsxs("div",{children:[t.jsx(E,{className:"w-[100px]"}),t.jsx(E,{className:"w-[100px]"})]})]})}function Ie({className:e,...r}){return t.jsx("div",{"data-slot":"card",className:h("bg-card text-card-foreground gap-md py-md flex flex-col rounded-xl border shadow-sm",e),...r})}function Le({className:e,...r}){return t.jsx("div",{"data-slot":"card-header",className:h("gap-sm px-md [.border-b]:pb-md @container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start has-[data-slot=card-action]:grid-cols-[1fr_auto]",e),...r})}function _e({className:e,...r}){return t.jsx("div",{"data-slot":"card-title",className:h("leading-none font-semibold",e),...r})}function Ee({className:e,...r}){return t.jsx("div",{"data-slot":"card-content",className:h("px-md",e),...r})}var C="Progress",R=100,[Fe,Je]=k(C),[$e,Oe]=Fe(C),H=d.forwardRef((e,r)=>{const{__scopeProgress:a,value:s=null,max:n,getValueLabel:o=ke,...i}=e;(n||n===0)&&!F(n)&&console.error(qe(`${n}`,"Progress"));const l=F(n)?n:R;s!==null&&!$(s,l)&&console.error(Te(`${s}`,"Progress"));const c=$(s,l)?s:null,f=P(c)?o(c,l):void 0;return t.jsx($e,{scope:a,value:c,max:l,children:t.jsx(N.div,{"aria-valuemax":l,"aria-valuemin":0,"aria-valuenow":P(c)?c:void 0,"aria-valuetext":f,role:"progressbar","data-state":J(c,l),"data-value":c??void 0,"data-max":l,...i,ref:r})})});H.displayName=C;var X="ProgressIndicator",Z=d.forwardRef((e,r)=>{const{__scopeProgress:a,...s}=e,n=Oe(X,a);return t.jsx(N.div,{"data-state":J(n.value,n.max),"data-value":n.value??void 0,"data-max":n.max,...s,ref:r})});Z.displayName=X;function ke(e,r){return`${Math.round(e/r*100)}%`}function J(e,r){return e==null?"indeterminate":e===r?"complete":"loading"}function P(e){return typeof e=="number"}function F(e){return P(e)&&!isNaN(e)&&e>0}function $(e,r){return P(e)&&!isNaN(e)&&e<=r&&e>=0}function qe(e,r){return`Invalid prop \`max\` of value \`${e}\` supplied to \`${r}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${R}\`.`}function Te(e,r){return`Invalid prop \`value\` of value \`${e}\` supplied to \`${r}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${R} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`}var Be=H,Ge=Z;function De({className:e,value:r,...a}){return t.jsx(Be,{"data-slot":"progress",className:h("bg-primary/10 relative h-2 w-full overflow-hidden rounded-full",e),...a,children:t.jsx(Ge,{"data-slot":"progress-indicator",className:"bg-accent-foreground/80 h-full w-full flex-1 rounded-full transition-all",style:{transform:`translateX(-${100-(r||0)}%)`}})})}function b(e){return e==null||Number.isNaN(e)?0:e}function Qe(...e){return b(e.reduce((r,a)=>r?r-b(a):a))}function Ve(...e){for(let r=0;r<e.length-1;r++)if(b(e[r])<=b(e[r+1]))return!1;return!0}function O(...e){return Math.min(...e.map(b))}function Ye(){const{nav:e}=fe(),[r,a]=d.useState([]),s=r.every(Boolean)&&r.length>2,n=d.useCallback(()=>a(o=>o.concat(!0)),[]);return t.jsxs("div",{className:"@container w-[100%] flex-1",children:[t.jsx("div",{className:"flex h-24 flex-col justify-center",children:s?t.jsx("div",{className:"animate-fade flex justify-center",children:t.jsx(me,{size:"lg",ping:!0,variant:"outline",onClick:()=>e(ge.DASHBOARD),children:"Launch"})}):t.jsx(A,{className:"animate-fade text-center",children:"Welcome, getting things set up..."})}),t.jsxs("div",{className:"gap-sm @min-5xl:gap-lg flex flex-wrap items-stretch justify-center",children:[t.jsx(Ke,{onSuccess:n}),t.jsx(ze,{onSuccess:n}),t.jsx(We,{onSuccess:n})]})]})}function We({onSuccess:e}){var o,i,l;const r=M(),{error:a,isSuccess:s,data:n}=T({refetchOnMount:!1,refetchOnWindowFocus:!1,queryKey:["me"],queryFn:()=>r(Y)});return d.useEffect(()=>{s&&e()},[s,e]),a?t.jsx(g,{heading:"Oops",content:a.message}):s?n!=null&&n.currentUser?t.jsx(g,{heading:"Contributions",content:t.jsx(U,{heading:"Projects:",length:10,total:(o=n.currentUser.contributedProjects)==null?void 0:o.count,items:(l=(i=n.currentUser.contributedProjects)==null?void 0:i.nodes)==null?void 0:l.filter(Boolean).map(c=>({...c,url:c.webUrl}))})}):t.jsx("div",{children:"No user?"}):t.jsx(g,{heading:"Fetching contributions",content:t.jsx(y,{loading:!0})})}function ze({onSuccess:e}){const{error:r,users:a,allFetched:s,progress:n}=Re();return d.useEffect(()=>{s&&e()},[s,e]),r?t.jsx(g,{heading:"Oops",content:r.message}):s?t.jsx(g,{heading:"Colleagues",content:t.jsx(y,{loading:!s,users:a})}):t.jsx(g,{heading:t.jsxs("span",{className:"gap-sm flex items-baseline text-nowrap",children:[t.jsx(A,{children:"Loading colleagues"}),t.jsx("span",{className:"@container flex-1",children:t.jsx(De,{className:"@max-[40px]:hidden",value:n})})]}),content:t.jsx(y,{loading:!0})})}function y(e){var s,n;const a=(e.users||Array(3).fill(void 0)).slice(0,3);return t.jsxs("ul",{className:"border-muted-foreground divide-y",children:[a.map((o,i)=>t.jsx("li",{className:o&&"animate-fade-up",children:t.jsx(w,{user:o,className:"my-md",loading:!o})},o?o.username:i.toString())),Ve((s=e==null?void 0:e.users)==null?void 0:s.length,3)&&t.jsx("li",{className:"animate-fade-up mt-6",children:t.jsxs(p,{className:"text-muted-foreground text-right",children:["and ",Qe((n=e==null?void 0:e.users)==null?void 0:n.length,3)," others"]})})]})}const Y=K(`
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
`);function Ke({onSuccess:e}){var l,c,f,x;const r=M(),{error:a,isSuccess:s,data:n}=T({refetchOnMount:!1,refetchOnWindowFocus:!1,queryKey:["me"],queryFn:()=>r(Y)});if(d.useEffect(()=>{s&&e()},[s,e]),a)return t.jsx(g,{heading:"Oops",content:a.message});if(!s)return t.jsx(g,{heading:"Fetching Profile",content:t.jsx(w,{loading:!0})});if(!(n!=null&&n.currentUser))return t.jsx("div",{children:"No user?"});const o=(l=n.currentUser.groupMemberships)==null?void 0:l.nodes,i=(c=n.currentUser.projectMemberships)==null?void 0:c.nodes;return t.jsx(g,{heading:t.jsxs("span",{children:["Welcome"," ",t.jsx("span",{className:"text-accent-foreground text-nowrap",children:n.currentUser.name||n.currentUser.username})]}),content:t.jsxs("div",{className:"gap-sm flex flex-col",children:[t.jsx(w,{user:{...n.currentUser,state:"active",bot:!1}}),t.jsx(U,{heading:"Groups:",total:o==null?void 0:o.length,length:O(o==null?void 0:o.length,2),items:(f=o==null?void 0:o.map(u=>u==null?void 0:u.group))==null?void 0:f.filter(Boolean).map(u=>({...u,url:u.webUrl}))}),t.jsx(U,{heading:"Projects:",length:O(i==null?void 0:i.length,3),total:i==null?void 0:i.length,items:(x=i==null?void 0:i.map(u=>u==null?void 0:u.project))==null?void 0:x.filter(Boolean).map(u=>({...u,url:u.webUrl}))})]})})}function U({total:e,items:r=[],heading:a,length:s}){return s===0?null:t.jsxs("div",{className:"animate-fade-up",children:[t.jsxs(p,{className:"text-muted-foreground",children:[a," [",e,"]"]}),t.jsx("ul",{className:"mx-sm",children:r.slice(0,s).map(n=>t.jsx("li",{children:n.url?t.jsx("a",{href:n.url,target:"_blank",rel:"noreferrer",children:t.jsx(p,{children:n.name})}):t.jsx(p,{children:"p.name"})},n.id))})]})}function g({heading:e,content:r}){return t.jsxs(Ie,{className:"max-w-[350px] flex-1 basis-[280px]",children:[t.jsx(Le,{children:t.jsx(_e,{children:typeof e=="string"?t.jsx(A,{children:e}):e})}),t.jsx(Ee,{children:r})]})}export{Ke as MyCard,Ye as default};
