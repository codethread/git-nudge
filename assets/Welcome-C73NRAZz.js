import{Q as X,o as L,p as J,q as Y,s as Z,u as A,t as ee,r as d,j as t,v as _,P as j,w as te,x as k,c as N,a as ae,i as re,N as se,S as ne,T as v,y as F,b as $,e as C,n as oe,B as ie,A as ce}from"./index-DaweCC-q.js";import{g as q,C as le,a as ue,b as de,c as fe}from"./card-5Qe5Of3g.js";import{m as I,g as he,s as me}from"./maths-Bni7feuY.js";var ge=class extends X{constructor(e,r){super(e,r)}bindMethods(){super.bindMethods(),this.fetchNextPage=this.fetchNextPage.bind(this),this.fetchPreviousPage=this.fetchPreviousPage.bind(this)}setOptions(e,r){super.setOptions({...e,behavior:L()},r)}getOptimisticResult(e){return e.behavior=L(),super.getOptimisticResult(e)}fetchNextPage(e){return this.fetch({...e,meta:{fetchMore:{direction:"forward"}}})}fetchPreviousPage(e){return this.fetch({...e,meta:{fetchMore:{direction:"backward"}}})}createResult(e,r){var p,R;const{state:n}=e,a=super.createResult(e,r),{isFetching:s,isRefetching:o,isError:i,isRefetchError:c}=a,l=(R=(p=n.fetchMeta)==null?void 0:p.fetchMore)==null?void 0:R.direction,f=i&&l==="forward",g=s&&l==="forward",u=i&&l==="backward",h=s&&l==="backward";return{...a,fetchNextPage:this.fetchNextPage,fetchPreviousPage:this.fetchPreviousPage,hasNextPage:Y(r,n.data),hasPreviousPage:J(r,n.data),isFetchNextPageError:f,isFetchingNextPage:g,isFetchPreviousPageError:u,isFetchingPreviousPage:h,isRefetchError:c&&!f&&!u,isRefetching:o&&!g&&!h}}};function xe(e,r){return Z(e,ge)}const ve=q(`
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
`),pe=()=>{const e=A(),r=xe({staleTime:ee(1,"days"),refetchOnMount:!1,refetchOnWindowFocus:!1,queryKey:["usersAll"],initialPageParam:"",queryFn:({pageParam:n})=>e(ve,{cursor:n}),getNextPageParam:({users:n})=>{var a;return n!=null&&n.pageInfo.hasNextPage?(a=n==null?void 0:n.pageInfo)==null?void 0:a.endCursor:null}});return d.useEffect(()=>{r.hasNextPage&&r.fetchNextPage()},[r]),d.useMemo(()=>{var g,u;const{error:n,data:a,isFetching:s}=r,o=((u=(g=a==null?void 0:a.pages.at(0))==null?void 0:g.users)==null?void 0:u.count)??0,i=a==null?void 0:a.pages.map(h=>{var x,p;return((p=(x=h.users)==null?void 0:x.nodes)==null?void 0:p.length)??0}).reduce((h,x)=>h+x),c=(i?i/o:0)*100,l=c===100,f=a&&l?a.pages.flatMap(h=>{var x;return(x=h.users)==null?void 0:x.nodes}).filter(Boolean):[];return{error:n,progress:c,isFetching:s,allFetched:l,allUsers:f,users:f.filter(h=>!h.bot&&h.state==="active")}},[r])},B=q(`
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
`);var U="Avatar",[je,Te]=_(U),[Pe,T]=je(U),Q=d.forwardRef((e,r)=>{const{__scopeAvatar:n,...a}=e,[s,o]=d.useState("idle");return t.jsx(Pe,{scope:n,imageLoadingStatus:s,onImageLoadingStatusChange:o,children:t.jsx(j.span,{...a,ref:r})})});Q.displayName=U;var D="AvatarImage",V=d.forwardRef((e,r)=>{const{__scopeAvatar:n,src:a,onLoadingStatusChange:s=()=>{},...o}=e,i=T(D,n),c=Ne(a,o.referrerPolicy),l=te(f=>{s(f),i.onImageLoadingStatusChange(f)});return k(()=>{c!=="idle"&&l(c)},[c,l]),c==="loaded"?t.jsx(j.img,{...o,ref:r,src:a}):null});V.displayName=D;var G="AvatarFallback",W=d.forwardRef((e,r)=>{const{__scopeAvatar:n,delayMs:a,...s}=e,o=T(G,n),[i,c]=d.useState(a===void 0);return d.useEffect(()=>{if(a!==void 0){const l=window.setTimeout(()=>c(!0),a);return()=>window.clearTimeout(l)}},[a]),i&&o.imageLoadingStatus!=="loaded"?t.jsx(j.span,{...s,ref:r}):null});W.displayName=G;function Ne(e,r){const[n,a]=d.useState("idle");return k(()=>{if(!e){a("error");return}let s=!0;const o=new window.Image,i=c=>()=>{s&&a(c)};return a("loading"),o.onload=i("loaded"),o.onerror=i("error"),o.src=e,r&&(o.referrerPolicy=r),()=>{s=!1}},[e,r]),n}var be=Q,ye=V,we=W;function Ae({className:e,...r}){return t.jsx(be,{"data-slot":"avatar",className:N("relative flex size-8 shrink-0 overflow-hidden rounded-full",e),...r})}function Ce({className:e,...r}){return t.jsx(ye,{"data-slot":"avatar-image",className:N("aspect-square size-full",e),...r})}function Ue({className:e,...r}){return t.jsx(we,{"data-slot":"avatar-fallback",className:N("bg-muted flex size-full items-center justify-center rounded-full",e),...r})}function b(e){var s;const r=ae(o=>o.gitlab.domain),n=re(e).with({loading:!0},()=>{}).with({user:se.select()},o=>o).exhaustive(),a=(s=n==null?void 0:n.avatarUrl)==null?void 0:s.replace(/^\//,`https://${r}/`);return t.jsxs("div",{className:N("flex items-center space-x-4",e.className),children:[n!=null&&n.avatarUrl?t.jsxs(Ae,{className:"hover:outline-accent-foreground h-10 w-10 outline outline-offset-1 transition hover:outline-2",children:[t.jsx(Ce,{src:a}),t.jsx(Ue,{className:"text-xl",children:n.username.slice(0,2)})]}):t.jsx(ne,{className:"h-10 w-10 rounded-full"}),n?t.jsxs("div",{children:[t.jsx(v,{flush:!0,children:n.name}),t.jsx("div",{className:"flex",children:t.jsxs(v,{flush:!0,children:[t.jsx("span",{className:"text-muted-foreground",children:n.state}),n.username===n.name?"":` ${n.username}`]})})]}):t.jsxs("div",{children:[t.jsx(F,{className:"w-[100px]"}),t.jsx(F,{className:"w-[100px]"})]})]})}var M="Progress",S=100,[Me,Qe]=_(M),[Se,Re]=Me(M),z=d.forwardRef((e,r)=>{const{__scopeProgress:n,value:a=null,max:s,getValueLabel:o=Fe,...i}=e;(s||s===0)&&!E(s)&&console.error(Ie(`${s}`,"Progress"));const c=E(s)?s:S;a!==null&&!O(a,c)&&console.error(Ee(`${a}`,"Progress"));const l=O(a,c)?a:null,f=P(l)?o(l,c):void 0;return t.jsx(Se,{scope:n,value:l,max:c,children:t.jsx(j.div,{"aria-valuemax":c,"aria-valuemin":0,"aria-valuenow":P(l)?l:void 0,"aria-valuetext":f,role:"progressbar","data-state":H(l,c),"data-value":l??void 0,"data-max":c,...i,ref:r})})});z.displayName=M;var K="ProgressIndicator",Le=d.forwardRef((e,r)=>{const{__scopeProgress:n,...a}=e,s=Re(K,n);return t.jsx(j.div,{"data-state":H(s.value,s.max),"data-value":s.value??void 0,"data-max":s.max,...a,ref:r})});Le.displayName=K;function Fe(e,r){return`${Math.round(e/r*100)}%`}function H(e,r){return e==null?"indeterminate":e===r?"complete":"loading"}function P(e){return typeof e=="number"}function E(e){return P(e)&&!isNaN(e)&&e>0}function O(e,r){return P(e)&&!isNaN(e)&&e<=r&&e>=0}function Ie(e,r){return`Invalid prop \`max\` of value \`${e}\` supplied to \`${r}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${S}\`.`}function Ee(e,r){return`Invalid prop \`value\` of value \`${e}\` supplied to \`${r}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${S} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`}function Oe({onSuccess:e}){var o,i,c;const r=A(),{error:n,isSuccess:a,data:s}=$({refetchOnMount:!1,refetchOnWindowFocus:!1,queryKey:["me"],queryFn:()=>r(B)});return d.useEffect(()=>{a&&e()},[a,e]),n?t.jsx(m,{heading:"Oops",content:n.message}):a?s!=null&&s.currentUser?t.jsx(m,{heading:"Contributions",content:t.jsx(w,{heading:"Projects:",length:10,total:(o=s.currentUser.contributedProjects)==null?void 0:o.count,items:(c=(i=s.currentUser.contributedProjects)==null?void 0:i.nodes)==null?void 0:c.filter(Boolean).map(l=>({...l,url:l.webUrl}))})}):t.jsx("div",{children:"No user?"}):t.jsx(m,{heading:"Fetching contributions",content:t.jsx(y,{})})}function _e({onSuccess:e}){const{error:r,users:n,allUsers:a,allFetched:s,progress:o}=pe();return d.useEffect(()=>{s&&e()},[s,e]),r?t.jsx(m,{heading:"Oops",content:r.message}):s?t.jsx(m,{heading:"Colleagues",content:t.jsx(y,{users:a})}):t.jsx(m,{heading:t.jsxs("span",{className:"gap-sm flex items-baseline text-nowrap",children:[t.jsx(C,{children:"Loading colleagues"}),t.jsx("span",{className:"@container flex-1",children:t.jsx(z,{className:"@max-[40px]:hidden",value:o})})]}),content:t.jsx(y,{})})}function y({users:e}){const n=(e==null?void 0:e.filter(a=>!a.bot&&a.state==="active"))||Array(3).fill(void 0);return t.jsxs("ul",{className:"border-muted-foreground divide-y",children:[n.slice(0,3).map((a,s)=>t.jsx("li",{className:a&&"animate-fade-up",children:t.jsx(b,{user:a,className:"my-md",loading:!a})},a?a.username:s.toString())),he(e==null?void 0:e.length,3)&&t.jsx("li",{className:"animate-fade-up mt-6",children:t.jsxs(v,{className:"text-muted-foreground text-right",children:["and ",me(e==null?void 0:e.length,3)," others"]})})]})}function ke({onSuccess:e}){var c,l,f,g;const r=A(),{error:n,isSuccess:a,data:s}=$({refetchOnMount:!1,refetchOnWindowFocus:!1,queryKey:["me"],queryFn:()=>r(B)});if(d.useEffect(()=>{a&&e()},[a,e]),n)return t.jsx(m,{heading:"Oops",content:n.message});if(!a)return t.jsx(m,{heading:"Fetching Profile",content:t.jsx(b,{loading:!0})});if(!(s!=null&&s.currentUser))return t.jsx("div",{children:"No user?"});const o=(c=s.currentUser.groupMemberships)==null?void 0:c.nodes,i=(l=s.currentUser.projectMemberships)==null?void 0:l.nodes;return t.jsx(m,{heading:t.jsxs("span",{children:["Welcome"," ",t.jsx("span",{className:"text-accent-foreground text-nowrap",children:s.currentUser.name||s.currentUser.username})]}),content:t.jsxs("div",{className:"gap-sm flex flex-col",children:[t.jsx(b,{user:{...s.currentUser,state:"active",bot:!1}}),t.jsx(w,{heading:"Groups:",total:o==null?void 0:o.length,length:I(o==null?void 0:o.length,2),items:(f=o==null?void 0:o.map(u=>u==null?void 0:u.group))==null?void 0:f.filter(Boolean).map(u=>({...u,url:u.webUrl}))}),t.jsx(w,{heading:"Projects:",length:I(i==null?void 0:i.length,3),total:i==null?void 0:i.length,items:(g=i==null?void 0:i.map(u=>u==null?void 0:u.project))==null?void 0:g.filter(Boolean).map(u=>({...u,url:u.webUrl}))})]})})}function w({total:e,items:r=[],heading:n,length:a}){return a===0?null:t.jsxs("div",{className:"animate-fade-up",children:[t.jsxs(v,{className:"text-muted-foreground",children:[n," [",e,"]"]}),t.jsx("ul",{className:"mx-sm",children:r.slice(0,a).map(s=>t.jsx("li",{children:s.url?t.jsx("a",{href:s.url,target:"_blank",rel:"noreferrer",children:t.jsx(v,{children:s.name})}):t.jsx(v,{children:"p.name"})},s.id))})]})}function m({heading:e,content:r}){return t.jsxs(le,{className:"max-w-[350px] flex-1 basis-[280px]",children:[t.jsx(ue,{children:t.jsx(de,{children:typeof e=="string"?t.jsx(C,{children:e}):e})}),t.jsx(fe,{children:r})]})}function De(){const{nav:e}=oe(),[r,n]=d.useState([]),a=r.every(Boolean)&&r.length>2,s=d.useCallback(()=>n(o=>o.concat(!0)),[]);return t.jsxs("div",{className:"@container w-[100%] flex-1",children:[t.jsx("div",{className:"flex h-24 flex-col justify-center",children:a?t.jsx("div",{className:"animate-fade flex justify-center",children:t.jsx(ie,{size:"lg",ping:!0,variant:"outline",onClick:()=>e(ce.DASHBOARD),children:"Launch"})}):t.jsx(C,{className:"animate-fade text-center",children:"Welcome, getting things set up..."})}),t.jsxs("div",{className:"gap-sm @min-5xl:gap-lg flex flex-wrap items-stretch justify-center",children:[t.jsx(ke,{onSuccess:s}),t.jsx(_e,{onSuccess:s}),t.jsx(Oe,{onSuccess:s})]})]})}export{De as default};
