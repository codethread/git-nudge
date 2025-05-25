import{z as O,N as I,j as e,c as _,S as k,T as x,a as y,r as m,b as B,P as M,L as g,B as L,u as T}from"./index-Blh_3CCp.js";import{g as q,u as V,A as W,a as D,b as G,c as S,R as z,d as Q}from"./avatar-oWXMAh7x.js";import{C as K,a as H,b as X,c as J}from"./card-ndG9TOkc.js";import{u as Y}from"./useUsers-DZLH6_AN.js";import{m as w,g as Z,s as ee}from"./maths-Bni7feuY.js";import{u as R}from"./useQuery-CJtX6N2R.js";const E=q(`
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
`);function j(r){var s;const n=V(i=>i.gitlab.domain),t=O(r).with({loading:!0},()=>{}).with({user:I.select()},i=>i).exhaustive(),a=(s=t==null?void 0:t.avatarUrl)==null?void 0:s.replace(/^\//,`https://${n}/`);return e.jsxs("div",{className:_("flex items-center space-x-4",r.className),children:[t!=null&&t.avatarUrl?e.jsxs(W,{className:"hover:outline-accent-foreground h-10 w-10 outline outline-offset-1 transition hover:outline-2",children:[e.jsx(D,{src:a}),e.jsx(G,{className:"text-xl",children:t.username.slice(0,2)})]}):e.jsx(k,{className:"h-10 w-10 rounded-full"}),t?e.jsxs("div",{children:[e.jsx(x,{flush:!0,children:t.name}),e.jsx("div",{className:"flex",children:e.jsxs(x,{flush:!0,children:[e.jsx("span",{className:"text-muted-foreground",children:t.state}),t.username===t.name?"":` ${t.username}`]})})]}):e.jsxs("div",{children:[e.jsx(y,{className:"w-[100px]"}),e.jsx(y,{className:"w-[100px]"})]})]})}var N="Progress",b=100,[re,je]=B(N),[se,te]=re(N),F=m.forwardRef((r,n)=>{const{__scopeProgress:t,value:a=null,max:s,getValueLabel:i=ne,...l}=r;(s||s===0)&&!U(s)&&console.error(ie(`${s}`,"Progress"));const o=U(s)?s:b;a!==null&&!C(a,o)&&console.error(le(`${a}`,"Progress"));const c=C(a,o)?a:null,f=h(c)?i(c,o):void 0;return e.jsx(se,{scope:t,value:c,max:o,children:e.jsx(M.div,{"aria-valuemax":o,"aria-valuemin":0,"aria-valuenow":h(c)?c:void 0,"aria-valuetext":f,role:"progressbar","data-state":A(c,o),"data-value":c??void 0,"data-max":o,...l,ref:n})})});F.displayName=N;var $="ProgressIndicator",ae=m.forwardRef((r,n)=>{const{__scopeProgress:t,...a}=r,s=te($,t);return e.jsx(M.div,{"data-state":A(s.value,s.max),"data-value":s.value??void 0,"data-max":s.max,...a,ref:n})});ae.displayName=$;function ne(r,n){return`${Math.round(r/n*100)}%`}function A(r,n){return r==null?"indeterminate":r===n?"complete":"loading"}function h(r){return typeof r=="number"}function U(r){return h(r)&&!isNaN(r)&&r>0}function C(r,n){return h(r)&&!isNaN(r)&&r<=n&&r>=0}function ie(r,n){return`Invalid prop \`max\` of value \`${r}\` supplied to \`${n}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${b}\`.`}function le(r,n){return`Invalid prop \`value\` of value \`${r}\` supplied to \`${n}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${b} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`}function oe({onSuccess:r}){var i,l,o;const n=S(),{error:t,isSuccess:a,data:s}=R({refetchOnMount:!1,refetchOnWindowFocus:!1,queryKey:["me"],queryFn:()=>n(E)});return m.useEffect(()=>{a&&r()},[a,r]),t?e.jsx(u,{heading:"Oops",content:t.message}):a?s!=null&&s.currentUser?e.jsx(u,{heading:"Contributions",content:e.jsx(v,{heading:"Projects:",length:10,total:(i=s.currentUser.contributedProjects)==null?void 0:i.count,items:(o=(l=s.currentUser.contributedProjects)==null?void 0:l.nodes)==null?void 0:o.filter(Boolean).map(c=>({...c,url:c.webUrl}))})}):e.jsx("div",{children:"No user?"}):e.jsx(u,{heading:"Fetching contributions",content:e.jsx(p,{})})}function ce({onSuccess:r}){const{error:n,allUsers:t,isFetching:a,allFetched:s,progress:i,refetch:l}=Y();return m.useEffect(()=>{s&&r()},[s,r]),n?e.jsx(u,{heading:"Oops",content:n.message}):s?e.jsx(u,{heading:"Colleagues",onRefresh:()=>void l(),refreshing:a,content:e.jsx(p,{users:t})}):e.jsx(u,{heading:e.jsxs("span",{className:"gap-sm flex items-baseline text-nowrap",children:[e.jsx(g,{children:"Loading colleagues"}),e.jsx("span",{className:"@container flex-1",children:e.jsx(F,{className:"@max-[40px]:hidden",value:i})})]}),content:e.jsx(p,{})})}function p({users:r}){const t=(r==null?void 0:r.filter(a=>!a.bot&&a.state==="active"))||Array(3).fill(void 0);return e.jsxs("ul",{className:"border-muted-foreground divide-y",children:[t.slice(0,3).map((a,s)=>e.jsx("li",{className:a&&"animate-fade-up",children:e.jsx(j,{user:a,className:"my-md",loading:!a})},a?a.username:s.toString())),Z(r==null?void 0:r.length,3)&&e.jsx("li",{className:"animate-fade-up mt-6",children:e.jsxs(x,{className:"text-muted-foreground text-right",children:["and ",ee(r==null?void 0:r.length,3)," others"]})})]})}function de({onSuccess:r}){var o,c,f,P;const n=S(),{error:t,isSuccess:a,data:s}=R({refetchOnMount:!1,refetchOnWindowFocus:!1,queryKey:["me"],queryFn:()=>n(E)});if(m.useEffect(()=>{a&&r()},[a,r]),t)return e.jsx(u,{heading:"Oops",content:t.message});if(!a)return e.jsx(u,{heading:"Fetching Profile",content:e.jsx(j,{loading:!0})});if(!(s!=null&&s.currentUser))return e.jsx("div",{children:"No user?"});const i=(o=s.currentUser.groupMemberships)==null?void 0:o.nodes,l=(c=s.currentUser.projectMemberships)==null?void 0:c.nodes;return e.jsx(u,{heading:e.jsxs(g,{children:["Welcome"," ",e.jsx("span",{className:"text-accent-foreground text-nowrap",children:s.currentUser.name||s.currentUser.username})]}),content:e.jsxs("div",{className:"gap-sm flex flex-col",children:[e.jsx(j,{user:{...s.currentUser,state:"active",bot:!1}}),e.jsx(v,{heading:"Groups:",total:i==null?void 0:i.length,length:w(i==null?void 0:i.length,2),items:(f=i==null?void 0:i.map(d=>d==null?void 0:d.group))==null?void 0:f.filter(Boolean).map(d=>({...d,url:d.webUrl}))}),e.jsx(v,{heading:"Projects:",length:w(l==null?void 0:l.length,3),total:l==null?void 0:l.length,items:(P=l==null?void 0:l.map(d=>d==null?void 0:d.project))==null?void 0:P.filter(Boolean).map(d=>({...d,url:d.webUrl}))})]})})}function v({total:r,items:n=[],heading:t,length:a}){return a===0?null:e.jsxs("div",{className:"animate-fade-up",children:[e.jsxs(x,{className:"text-muted-foreground",children:[t," [",r,"]"]}),e.jsx("ul",{className:"mx-sm",children:n.slice(0,a).map(s=>e.jsx("li",{children:s.url?e.jsx("a",{href:s.url,target:"_blank",rel:"noreferrer",children:e.jsx(x,{children:s.name})}):e.jsx(x,{children:"p.name"})},s.id))})]})}function u({heading:r,content:n,onRefresh:t,refreshing:a}){return e.jsxs(K,{className:"max-w-[350px] flex-1 basis-[280px]",children:[e.jsx(H,{children:e.jsxs("div",{className:"flex justify-between",children:[e.jsx(X,{children:typeof r=="string"?e.jsx(g,{children:r}):r}),t&&e.jsx(L,{variant:"outline",size:"iconSm",onClick:t,children:e.jsx(z,{className:a?"animate-spin":""})})]})}),e.jsx(J,{children:n})]})}const pe=function(){const n=T(),[t,a]=m.useState([]),s=t.every(Boolean)&&t.length>2,i=m.useCallback(()=>a(l=>l.concat(!0)),[]);return e.jsx(Q,{children:e.jsxs("div",{className:"@container w-[100%] flex-1",children:[e.jsx("div",{className:"flex h-24 flex-col justify-center",children:s?e.jsx("div",{className:"animate-fade flex justify-center",children:e.jsx(L,{size:"lg",ping:!0,variant:"outline",onClick:()=>n({to:"/"}),children:"Launch"})}):e.jsx(g,{className:"animate-fade text-center",children:"Welcome, getting things set up..."})}),e.jsxs("div",{className:"gap-sm @min-5xl:gap-lg flex flex-wrap items-stretch justify-center",children:[e.jsx(de,{onSuccess:i}),e.jsx(ce,{onSuccess:i}),e.jsx(oe,{onSuccess:i})]})]})})};export{pe as component};
