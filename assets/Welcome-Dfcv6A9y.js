import{o as J,Q as Y,p as R,q as Z,s as ee,t as te,u as C,v as ae,r as d,j as t,w as O,P as j,x as re,y as _,c as P,a as se,i as ne,N as ie,S as oe,T as v,A as I,b as $,e as b,B as q,n as ce,C as le}from"./index-CprKEVsc.js";import{g as B,C as ue,a as de,b as fe,c as he}from"./card-BlpsshGu.js";import{m as E,g as me,s as ge}from"./maths-Bni7feuY.js";/**
 * @license lucide-react v0.482.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xe=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],ve=J("RefreshCw",xe);var pe=class extends Y{constructor(e,a){super(e,a)}bindMethods(){super.bindMethods(),this.fetchNextPage=this.fetchNextPage.bind(this),this.fetchPreviousPage=this.fetchPreviousPage.bind(this)}setOptions(e,a){super.setOptions({...e,behavior:R()},a)}getOptimisticResult(e){return e.behavior=R(),super.getOptimisticResult(e)}fetchNextPage(e){return this.fetch({...e,meta:{fetchMore:{direction:"forward"}}})}fetchPreviousPage(e){return this.fetch({...e,meta:{fetchMore:{direction:"backward"}}})}createResult(e,a){var p,L;const{state:n}=e,r=super.createResult(e,a),{isFetching:s,isRefetching:i,isError:o,isRefetchError:c}=r,l=(L=(p=n.fetchMeta)==null?void 0:p.fetchMore)==null?void 0:L.direction,f=o&&l==="forward",g=s&&l==="forward",u=o&&l==="backward",h=s&&l==="backward";return{...r,fetchNextPage:this.fetchNextPage,fetchPreviousPage:this.fetchPreviousPage,hasNextPage:ee(a,n.data),hasPreviousPage:Z(a,n.data),isFetchNextPageError:f,isFetchingNextPage:g,isFetchPreviousPageError:u,isFetchingPreviousPage:h,isRefetchError:c&&!f&&!u,isRefetching:i&&!g&&!h}}};function je(e,a){return te(e,pe)}const Ne=B(`
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
`),Pe=()=>{const e=C(),a=je({staleTime:ae(1,"days"),refetchOnMount:!1,refetchOnWindowFocus:!1,queryKey:["usersAll"],initialPageParam:"",queryFn:({pageParam:n})=>e(Ne,{cursor:n}),getNextPageParam:({users:n})=>{var r;return n!=null&&n.pageInfo.hasNextPage?(r=n==null?void 0:n.pageInfo)==null?void 0:r.endCursor:null}});return d.useEffect(()=>{a.hasNextPage&&a.fetchNextPage()},[a]),d.useMemo(()=>{var g,u;const{error:n,data:r,isFetching:s}=a,i=((u=(g=r==null?void 0:r.pages.at(0))==null?void 0:g.users)==null?void 0:u.count)??0,o=r==null?void 0:r.pages.map(h=>{var x,p;return((p=(x=h.users)==null?void 0:x.nodes)==null?void 0:p.length)??0}).reduce((h,x)=>h+x),c=(o?o/i:0)*100,l=c===100,f=r&&l?r.pages.flatMap(h=>{var x;return(x=h.users)==null?void 0:x.nodes}).filter(Boolean):[];return{error:n,progress:c,isFetching:s,allFetched:l,allUsers:f,refetch:a.refetch,users:f.filter(h=>!h.bot&&h.state==="active")}},[a])},T=B(`
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
`);var M="Avatar",[be,Ve]=O(M),[ye,Q]=be(M),D=d.forwardRef((e,a)=>{const{__scopeAvatar:n,...r}=e,[s,i]=d.useState("idle");return t.jsx(ye,{scope:n,imageLoadingStatus:s,onImageLoadingStatusChange:i,children:t.jsx(j.span,{...r,ref:a})})});D.displayName=M;var V="AvatarImage",z=d.forwardRef((e,a)=>{const{__scopeAvatar:n,src:r,onLoadingStatusChange:s=()=>{},...i}=e,o=Q(V,n),c=we(r,i.referrerPolicy),l=re(f=>{s(f),o.onImageLoadingStatusChange(f)});return _(()=>{c!=="idle"&&l(c)},[c,l]),c==="loaded"?t.jsx(j.img,{...i,ref:a,src:r}):null});z.displayName=V;var G="AvatarFallback",W=d.forwardRef((e,a)=>{const{__scopeAvatar:n,delayMs:r,...s}=e,i=Q(G,n),[o,c]=d.useState(r===void 0);return d.useEffect(()=>{if(r!==void 0){const l=window.setTimeout(()=>c(!0),r);return()=>window.clearTimeout(l)}},[r]),o&&i.imageLoadingStatus!=="loaded"?t.jsx(j.span,{...s,ref:a}):null});W.displayName=G;function we(e,a){const[n,r]=d.useState("idle");return _(()=>{if(!e){r("error");return}let s=!0;const i=new window.Image,o=c=>()=>{s&&r(c)};return r("loading"),i.onload=o("loaded"),i.onerror=o("error"),i.src=e,a&&(i.referrerPolicy=a),()=>{s=!1}},[e,a]),n}var Ae=D,Ce=z,Me=W;function Ue({className:e,...a}){return t.jsx(Ae,{"data-slot":"avatar",className:P("relative flex size-8 shrink-0 overflow-hidden rounded-full",e),...a})}function Se({className:e,...a}){return t.jsx(Ce,{"data-slot":"avatar-image",className:P("aspect-square size-full",e),...a})}function Le({className:e,...a}){return t.jsx(Me,{"data-slot":"avatar-fallback",className:P("bg-muted flex size-full items-center justify-center rounded-full",e),...a})}function y(e){var s;const a=se(i=>i.gitlab.domain),n=ne(e).with({loading:!0},()=>{}).with({user:ie.select()},i=>i).exhaustive(),r=(s=n==null?void 0:n.avatarUrl)==null?void 0:s.replace(/^\//,`https://${a}/`);return t.jsxs("div",{className:P("flex items-center space-x-4",e.className),children:[n!=null&&n.avatarUrl?t.jsxs(Ue,{className:"hover:outline-accent-foreground h-10 w-10 outline outline-offset-1 transition hover:outline-2",children:[t.jsx(Se,{src:r}),t.jsx(Le,{className:"text-xl",children:n.username.slice(0,2)})]}):t.jsx(oe,{className:"h-10 w-10 rounded-full"}),n?t.jsxs("div",{children:[t.jsx(v,{flush:!0,children:n.name}),t.jsx("div",{className:"flex",children:t.jsxs(v,{flush:!0,children:[t.jsx("span",{className:"text-muted-foreground",children:n.state}),n.username===n.name?"":` ${n.username}`]})})]}):t.jsxs("div",{children:[t.jsx(I,{className:"w-[100px]"}),t.jsx(I,{className:"w-[100px]"})]})]})}var U="Progress",S=100,[Re,ze]=O(U),[Ie,Ee]=Re(U),K=d.forwardRef((e,a)=>{const{__scopeProgress:n,value:r=null,max:s,getValueLabel:i=ke,...o}=e;(s||s===0)&&!F(s)&&console.error(Oe(`${s}`,"Progress"));const c=F(s)?s:S;r!==null&&!k(r,c)&&console.error(_e(`${r}`,"Progress"));const l=k(r,c)?r:null,f=N(l)?i(l,c):void 0;return t.jsx(Ie,{scope:n,value:l,max:c,children:t.jsx(j.div,{"aria-valuemax":c,"aria-valuemin":0,"aria-valuenow":N(l)?l:void 0,"aria-valuetext":f,role:"progressbar","data-state":X(l,c),"data-value":l??void 0,"data-max":c,...o,ref:a})})});K.displayName=U;var H="ProgressIndicator",Fe=d.forwardRef((e,a)=>{const{__scopeProgress:n,...r}=e,s=Ee(H,n);return t.jsx(j.div,{"data-state":X(s.value,s.max),"data-value":s.value??void 0,"data-max":s.max,...r,ref:a})});Fe.displayName=H;function ke(e,a){return`${Math.round(e/a*100)}%`}function X(e,a){return e==null?"indeterminate":e===a?"complete":"loading"}function N(e){return typeof e=="number"}function F(e){return N(e)&&!isNaN(e)&&e>0}function k(e,a){return N(e)&&!isNaN(e)&&e<=a&&e>=0}function Oe(e,a){return`Invalid prop \`max\` of value \`${e}\` supplied to \`${a}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${S}\`.`}function _e(e,a){return`Invalid prop \`value\` of value \`${e}\` supplied to \`${a}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${S} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`}function $e({onSuccess:e}){var i,o,c;const a=C(),{error:n,isSuccess:r,data:s}=$({refetchOnMount:!1,refetchOnWindowFocus:!1,queryKey:["me"],queryFn:()=>a(T)});return d.useEffect(()=>{r&&e()},[r,e]),n?t.jsx(m,{heading:"Oops",content:n.message}):r?s!=null&&s.currentUser?t.jsx(m,{heading:"Contributions",content:t.jsx(A,{heading:"Projects:",length:10,total:(i=s.currentUser.contributedProjects)==null?void 0:i.count,items:(c=(o=s.currentUser.contributedProjects)==null?void 0:o.nodes)==null?void 0:c.filter(Boolean).map(l=>({...l,url:l.webUrl}))})}):t.jsx("div",{children:"No user?"}):t.jsx(m,{heading:"Fetching contributions",content:t.jsx(w,{})})}function qe({onSuccess:e}){const{error:a,users:n,allUsers:r,allFetched:s,progress:i,refetch:o}=Pe();return d.useEffect(()=>{s&&e()},[s,e]),a?t.jsx(m,{heading:"Oops",content:a.message}):s?t.jsx(m,{heading:"Colleagues",onRefresh:()=>void o(),content:t.jsx(w,{users:r})}):t.jsx(m,{heading:t.jsxs("span",{className:"gap-sm flex items-baseline text-nowrap",children:[t.jsx(b,{children:"Loading colleagues"}),t.jsx("span",{className:"@container flex-1",children:t.jsx(K,{className:"@max-[40px]:hidden",value:i})})]}),content:t.jsx(w,{})})}function w({users:e}){const n=(e==null?void 0:e.filter(r=>!r.bot&&r.state==="active"))||Array(3).fill(void 0);return t.jsxs("ul",{className:"border-muted-foreground divide-y",children:[n.slice(0,3).map((r,s)=>t.jsx("li",{className:r&&"animate-fade-up",children:t.jsx(y,{user:r,className:"my-md",loading:!r})},r?r.username:s.toString())),me(e==null?void 0:e.length,3)&&t.jsx("li",{className:"animate-fade-up mt-6",children:t.jsxs(v,{className:"text-muted-foreground text-right",children:["and ",ge(e==null?void 0:e.length,3)," others"]})})]})}function Be({onSuccess:e}){var c,l,f,g;const a=C(),{error:n,isSuccess:r,data:s}=$({refetchOnMount:!1,refetchOnWindowFocus:!1,queryKey:["me"],queryFn:()=>a(T)});if(d.useEffect(()=>{r&&e()},[r,e]),n)return t.jsx(m,{heading:"Oops",content:n.message});if(!r)return t.jsx(m,{heading:"Fetching Profile",content:t.jsx(y,{loading:!0})});if(!(s!=null&&s.currentUser))return t.jsx("div",{children:"No user?"});const i=(c=s.currentUser.groupMemberships)==null?void 0:c.nodes,o=(l=s.currentUser.projectMemberships)==null?void 0:l.nodes;return t.jsx(m,{heading:t.jsxs(b,{children:["Welcome"," ",t.jsx("span",{className:"text-accent-foreground text-nowrap",children:s.currentUser.name||s.currentUser.username})]}),content:t.jsxs("div",{className:"gap-sm flex flex-col",children:[t.jsx(y,{user:{...s.currentUser,state:"active",bot:!1}}),t.jsx(A,{heading:"Groups:",total:i==null?void 0:i.length,length:E(i==null?void 0:i.length,2),items:(f=i==null?void 0:i.map(u=>u==null?void 0:u.group))==null?void 0:f.filter(Boolean).map(u=>({...u,url:u.webUrl}))}),t.jsx(A,{heading:"Projects:",length:E(o==null?void 0:o.length,3),total:o==null?void 0:o.length,items:(g=o==null?void 0:o.map(u=>u==null?void 0:u.project))==null?void 0:g.filter(Boolean).map(u=>({...u,url:u.webUrl}))})]})})}function A({total:e,items:a=[],heading:n,length:r}){return r===0?null:t.jsxs("div",{className:"animate-fade-up",children:[t.jsxs(v,{className:"text-muted-foreground",children:[n," [",e,"]"]}),t.jsx("ul",{className:"mx-sm",children:a.slice(0,r).map(s=>t.jsx("li",{children:s.url?t.jsx("a",{href:s.url,target:"_blank",rel:"noreferrer",children:t.jsx(v,{children:s.name})}):t.jsx(v,{children:"p.name"})},s.id))})]})}function m({heading:e,content:a,onRefresh:n}){return t.jsxs(ue,{className:"max-w-[350px] flex-1 basis-[280px]",children:[t.jsx(de,{children:t.jsxs("div",{className:"flex justify-between",children:[t.jsx(fe,{children:typeof e=="string"?t.jsx(b,{children:e}):e}),n&&t.jsx(q,{variant:"outline",size:"iconSm",onClick:n,children:t.jsx(ve,{})})]})}),t.jsx(he,{children:a})]})}function Ge(){const{nav:e}=ce(),[a,n]=d.useState([]),r=a.every(Boolean)&&a.length>2,s=d.useCallback(()=>n(i=>i.concat(!0)),[]);return t.jsxs("div",{className:"@container w-[100%] flex-1",children:[t.jsx("div",{className:"flex h-24 flex-col justify-center",children:r?t.jsx("div",{className:"animate-fade flex justify-center",children:t.jsx(q,{size:"lg",ping:!0,variant:"outline",onClick:()=>e(le.DASHBOARD),children:"Launch"})}):t.jsx(b,{className:"animate-fade text-center",children:"Welcome, getting things set up..."})}),t.jsxs("div",{className:"gap-sm @min-5xl:gap-lg flex flex-wrap items-stretch justify-center",children:[t.jsx(Be,{onSuccess:s}),t.jsx(qe,{onSuccess:s}),t.jsx($e,{onSuccess:s})]})]})}export{Ge as default};
