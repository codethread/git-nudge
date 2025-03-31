import{Q as X,m as R,n as J,o as Y,p as Z,u as A,q as ee,r as d,j as t,s as _,P as p,t as te,v as k,c as N,a as ae,e as re,N as se,S as ne,T as v,w as F,b as $,L as C,l as ie,B as oe,x as le}from"./index-ySmlXLLv.js";import{g as q,m as I,C as ce,a as ue,b as de,d as fe,e as he,s as me}from"./maths-DBVxLnsE.js";var ge=class extends X{constructor(e,a){super(e,a)}bindMethods(){super.bindMethods(),this.fetchNextPage=this.fetchNextPage.bind(this),this.fetchPreviousPage=this.fetchPreviousPage.bind(this)}setOptions(e,a){super.setOptions({...e,behavior:R()},a)}getOptimisticResult(e){return e.behavior=R(),super.getOptimisticResult(e)}fetchNextPage(e){return this.fetch({...e,meta:{fetchMore:{direction:"forward"}}})}fetchPreviousPage(e){return this.fetch({...e,meta:{fetchMore:{direction:"backward"}}})}createResult(e,a){var j,L;const{state:n}=e,r=super.createResult(e,a),{isFetching:s,isRefetching:i,isError:o,isRefetchError:l}=r,c=(L=(j=n.fetchMeta)==null?void 0:j.fetchMore)==null?void 0:L.direction,f=o&&c==="forward",g=s&&c==="forward",u=o&&c==="backward",h=s&&c==="backward";return{...r,fetchNextPage:this.fetchNextPage,fetchPreviousPage:this.fetchPreviousPage,hasNextPage:Y(a,n.data),hasPreviousPage:J(a,n.data),isFetchNextPageError:f,isFetchingNextPage:g,isFetchPreviousPageError:u,isFetchingPreviousPage:h,isRefetchError:l&&!f&&!u,isRefetching:i&&!g&&!h}}};function xe(e,a){return Z(e,ge)}const ve=q(`
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
`),je=()=>{const e=A(),a=xe({staleTime:ee(1,"days"),refetchOnMount:!1,refetchOnWindowFocus:!1,queryKey:["usersAll"],initialPageParam:"",queryFn:({pageParam:n})=>e(ve,{cursor:n}),getNextPageParam:({users:n})=>{var r;return n!=null&&n.pageInfo.hasNextPage?(r=n==null?void 0:n.pageInfo)==null?void 0:r.endCursor:null}});return d.useEffect(()=>{a.hasNextPage&&a.fetchNextPage()},[a]),d.useMemo(()=>{var g,u;const{error:n,data:r,isFetching:s}=a,i=((u=(g=r==null?void 0:r.pages.at(0))==null?void 0:g.users)==null?void 0:u.count)??0,o=r==null?void 0:r.pages.map(h=>{var x,j;return((j=(x=h.users)==null?void 0:x.nodes)==null?void 0:j.length)??0}).reduce((h,x)=>h+x),l=(o?o/i:0)*100,c=l===100,f=r&&c?r.pages.flatMap(h=>{var x;return(x=h.users)==null?void 0:x.nodes}).filter(Boolean):[];return{error:n,progress:l,isFetching:s,allFetched:c,allUsers:f,users:f.filter(h=>!h.bot&&h.state==="active")}},[a])},B=q(`
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
`);var M="Avatar",[pe,Be]=_(M),[Pe,T]=pe(M),Q=d.forwardRef((e,a)=>{const{__scopeAvatar:n,...r}=e,[s,i]=d.useState("idle");return t.jsx(Pe,{scope:n,imageLoadingStatus:s,onImageLoadingStatusChange:i,children:t.jsx(p.span,{...r,ref:a})})});Q.displayName=M;var D="AvatarImage",V=d.forwardRef((e,a)=>{const{__scopeAvatar:n,src:r,onLoadingStatusChange:s=()=>{},...i}=e,o=T(D,n),l=Ne(r,i.referrerPolicy),c=te(f=>{s(f),o.onImageLoadingStatusChange(f)});return k(()=>{l!=="idle"&&c(l)},[l,c]),l==="loaded"?t.jsx(p.img,{...i,ref:a,src:r}):null});V.displayName=D;var G="AvatarFallback",W=d.forwardRef((e,a)=>{const{__scopeAvatar:n,delayMs:r,...s}=e,i=T(G,n),[o,l]=d.useState(r===void 0);return d.useEffect(()=>{if(r!==void 0){const c=window.setTimeout(()=>l(!0),r);return()=>window.clearTimeout(c)}},[r]),o&&i.imageLoadingStatus!=="loaded"?t.jsx(p.span,{...s,ref:a}):null});W.displayName=G;function Ne(e,a){const[n,r]=d.useState("idle");return k(()=>{if(!e){r("error");return}let s=!0;const i=new window.Image,o=l=>()=>{s&&r(l)};return r("loading"),i.onload=o("loaded"),i.onerror=o("error"),i.src=e,a&&(i.referrerPolicy=a),()=>{s=!1}},[e,a]),n}var be=Q,ye=V,we=W;function Ae({className:e,...a}){return t.jsx(be,{"data-slot":"avatar",className:N("relative flex size-8 shrink-0 overflow-hidden rounded-full",e),...a})}function Ce({className:e,...a}){return t.jsx(ye,{"data-slot":"avatar-image",className:N("aspect-square size-full",e),...a})}function Me({className:e,...a}){return t.jsx(we,{"data-slot":"avatar-fallback",className:N("bg-muted flex size-full items-center justify-center rounded-full",e),...a})}function b(e){var s;const a=ae(i=>i.gitlab.domain),n=re(e).with({loading:!0},()=>{}).with({user:se.select()},i=>i).exhaustive(),r=(s=n==null?void 0:n.avatarUrl)==null?void 0:s.replace(/^\//,`https://${a}/`);return t.jsxs("div",{className:N("flex items-center space-x-4",e.className),children:[n!=null&&n.avatarUrl?t.jsxs(Ae,{className:"hover:outline-accent-foreground h-10 w-10 outline outline-offset-1 transition hover:outline-2",children:[t.jsx(Ce,{src:r}),t.jsx(Me,{className:"text-xl",children:n.username.slice(0,2)})]}):t.jsx(ne,{className:"h-10 w-10 rounded-full"}),n?t.jsxs("div",{children:[t.jsx(v,{flush:!0,children:n.name}),t.jsx("div",{className:"flex",children:t.jsxs(v,{flush:!0,children:[t.jsx("span",{className:"text-muted-foreground",children:n.state}),n.username===n.name?"":` ${n.username}`]})})]}):t.jsxs("div",{children:[t.jsx(F,{className:"w-[100px]"}),t.jsx(F,{className:"w-[100px]"})]})]})}var S="Progress",U=100,[Se,Te]=_(S),[Ue,Le]=Se(S),z=d.forwardRef((e,a)=>{const{__scopeProgress:n,value:r=null,max:s,getValueLabel:i=Fe,...o}=e;(s||s===0)&&!E(s)&&console.error(Ie(`${s}`,"Progress"));const l=E(s)?s:U;r!==null&&!O(r,l)&&console.error(Ee(`${r}`,"Progress"));const c=O(r,l)?r:null,f=P(c)?i(c,l):void 0;return t.jsx(Ue,{scope:n,value:c,max:l,children:t.jsx(p.div,{"aria-valuemax":l,"aria-valuemin":0,"aria-valuenow":P(c)?c:void 0,"aria-valuetext":f,role:"progressbar","data-state":H(c,l),"data-value":c??void 0,"data-max":l,...o,ref:a})})});z.displayName=S;var K="ProgressIndicator",Re=d.forwardRef((e,a)=>{const{__scopeProgress:n,...r}=e,s=Le(K,n);return t.jsx(p.div,{"data-state":H(s.value,s.max),"data-value":s.value??void 0,"data-max":s.max,...r,ref:a})});Re.displayName=K;function Fe(e,a){return`${Math.round(e/a*100)}%`}function H(e,a){return e==null?"indeterminate":e===a?"complete":"loading"}function P(e){return typeof e=="number"}function E(e){return P(e)&&!isNaN(e)&&e>0}function O(e,a){return P(e)&&!isNaN(e)&&e<=a&&e>=0}function Ie(e,a){return`Invalid prop \`max\` of value \`${e}\` supplied to \`${a}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${U}\`.`}function Ee(e,a){return`Invalid prop \`value\` of value \`${e}\` supplied to \`${a}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${U} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`}function Oe({onSuccess:e}){var i,o,l;const a=A(),{error:n,isSuccess:r,data:s}=$({refetchOnMount:!1,refetchOnWindowFocus:!1,queryKey:["me"],queryFn:()=>a(B)});return d.useEffect(()=>{r&&e()},[r,e]),n?t.jsx(m,{heading:"Oops",content:n.message}):r?s!=null&&s.currentUser?t.jsx(m,{heading:"Contributions",content:t.jsx(w,{heading:"Projects:",length:10,total:(i=s.currentUser.contributedProjects)==null?void 0:i.count,items:(l=(o=s.currentUser.contributedProjects)==null?void 0:o.nodes)==null?void 0:l.filter(Boolean).map(c=>({...c,url:c.webUrl}))})}):t.jsx("div",{children:"No user?"}):t.jsx(m,{heading:"Fetching contributions",content:t.jsx(y,{loading:!0})})}function _e({onSuccess:e}){const{error:a,users:n,allFetched:r,progress:s}=je();return d.useEffect(()=>{r&&e()},[r,e]),a?t.jsx(m,{heading:"Oops",content:a.message}):r?t.jsx(m,{heading:"Colleagues",content:t.jsx(y,{loading:!r,users:n})}):t.jsx(m,{heading:t.jsxs("span",{className:"gap-sm flex items-baseline text-nowrap",children:[t.jsx(C,{children:"Loading colleagues"}),t.jsx("span",{className:"@container flex-1",children:t.jsx(z,{className:"@max-[40px]:hidden",value:s})})]}),content:t.jsx(y,{loading:!0})})}function y(e){var r,s;const n=(e.users||Array(3).fill(void 0)).slice(0,3);return t.jsxs("ul",{className:"border-muted-foreground divide-y",children:[n.map((i,o)=>t.jsx("li",{className:i&&"animate-fade-up",children:t.jsx(b,{user:i,className:"my-md",loading:!i})},i?i.username:o.toString())),he((r=e==null?void 0:e.users)==null?void 0:r.length,3)&&t.jsx("li",{className:"animate-fade-up mt-6",children:t.jsxs(v,{className:"text-muted-foreground text-right",children:["and ",me((s=e==null?void 0:e.users)==null?void 0:s.length,3)," others"]})})]})}function ke({onSuccess:e}){var l,c,f,g;const a=A(),{error:n,isSuccess:r,data:s}=$({refetchOnMount:!1,refetchOnWindowFocus:!1,queryKey:["me"],queryFn:()=>a(B)});if(d.useEffect(()=>{r&&e()},[r,e]),n)return t.jsx(m,{heading:"Oops",content:n.message});if(!r)return t.jsx(m,{heading:"Fetching Profile",content:t.jsx(b,{loading:!0})});if(!(s!=null&&s.currentUser))return t.jsx("div",{children:"No user?"});const i=(l=s.currentUser.groupMemberships)==null?void 0:l.nodes,o=(c=s.currentUser.projectMemberships)==null?void 0:c.nodes;return t.jsx(m,{heading:t.jsxs("span",{children:["Welcome"," ",t.jsx("span",{className:"text-accent-foreground text-nowrap",children:s.currentUser.name||s.currentUser.username})]}),content:t.jsxs("div",{className:"gap-sm flex flex-col",children:[t.jsx(b,{user:{...s.currentUser,state:"active",bot:!1}}),t.jsx(w,{heading:"Groups:",total:i==null?void 0:i.length,length:I(i==null?void 0:i.length,2),items:(f=i==null?void 0:i.map(u=>u==null?void 0:u.group))==null?void 0:f.filter(Boolean).map(u=>({...u,url:u.webUrl}))}),t.jsx(w,{heading:"Projects:",length:I(o==null?void 0:o.length,3),total:o==null?void 0:o.length,items:(g=o==null?void 0:o.map(u=>u==null?void 0:u.project))==null?void 0:g.filter(Boolean).map(u=>({...u,url:u.webUrl}))})]})})}function w({total:e,items:a=[],heading:n,length:r}){return r===0?null:t.jsxs("div",{className:"animate-fade-up",children:[t.jsxs(v,{className:"text-muted-foreground",children:[n," [",e,"]"]}),t.jsx("ul",{className:"mx-sm",children:a.slice(0,r).map(s=>t.jsx("li",{children:s.url?t.jsx("a",{href:s.url,target:"_blank",rel:"noreferrer",children:t.jsx(v,{children:s.name})}):t.jsx(v,{children:"p.name"})},s.id))})]})}function m({heading:e,content:a}){return t.jsxs(ce,{className:"max-w-[350px] flex-1 basis-[280px]",children:[t.jsx(ue,{children:t.jsx(de,{children:typeof e=="string"?t.jsx(C,{children:e}):e})}),t.jsx(fe,{children:a})]})}function Qe(){const{nav:e}=ie(),[a,n]=d.useState([]),r=a.every(Boolean)&&a.length>2,s=d.useCallback(()=>n(i=>i.concat(!0)),[]);return t.jsxs("div",{className:"@container w-[100%] flex-1",children:[t.jsx("div",{className:"flex h-24 flex-col justify-center",children:r?t.jsx("div",{className:"animate-fade flex justify-center",children:t.jsx(oe,{size:"lg",ping:!0,variant:"outline",onClick:()=>e(le.DASHBOARD),children:"Launch"})}):t.jsx(C,{className:"animate-fade text-center",children:"Welcome, getting things set up..."})}),t.jsxs("div",{className:"gap-sm @min-5xl:gap-lg flex flex-wrap items-stretch justify-center",children:[t.jsx(ke,{onSuccess:s}),t.jsx(_e,{onSuccess:s}),t.jsx(Oe,{onSuccess:s})]})]})}export{Qe as default};
