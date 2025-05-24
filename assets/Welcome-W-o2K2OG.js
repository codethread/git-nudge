import{r as m,j as e,c as I,P as C,u as M,a as L,L as g,B as E,T as x,b as S}from"./index-Vwi4E7Qu.js";import{C as _,a as B,b as q,c as A}from"./card-Dup_6X1K.js";import{U as p,u as T}from"./Users-9nGZ_zgA.js";import{m as P,g as V,s as W}from"./maths-Bni7feuY.js";import{g as k,R as D}from"./avatar-CRwpTwL-.js";const R=k(`
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
`);var b="Progress",N=100,[G,ie]=I(b),[Q,z]=G(b),F=m.forwardRef((r,a)=>{const{__scopeProgress:n,value:t=null,max:s,getValueLabel:i=H,...o}=r;(s||s===0)&&!U(s)&&console.error(X(`${s}`,"Progress"));const l=U(s)?s:N;t!==null&&!w(t,l)&&console.error(J(`${t}`,"Progress"));const c=w(t,l)?t:null,f=h(c)?i(c,l):void 0;return e.jsx(Q,{scope:n,value:c,max:l,children:e.jsx(C.div,{"aria-valuemax":l,"aria-valuemin":0,"aria-valuenow":h(c)?c:void 0,"aria-valuetext":f,role:"progressbar","data-state":$(c,l),"data-value":c??void 0,"data-max":l,...o,ref:a})})});F.displayName=b;var O="ProgressIndicator",K=m.forwardRef((r,a)=>{const{__scopeProgress:n,...t}=r,s=z(O,n);return e.jsx(C.div,{"data-state":$(s.value,s.max),"data-value":s.value??void 0,"data-max":s.max,...t,ref:a})});K.displayName=O;function H(r,a){return`${Math.round(r/a*100)}%`}function $(r,a){return r==null?"indeterminate":r===a?"complete":"loading"}function h(r){return typeof r=="number"}function U(r){return h(r)&&!isNaN(r)&&r>0}function w(r,a){return h(r)&&!isNaN(r)&&r<=a&&r>=0}function X(r,a){return`Invalid prop \`max\` of value \`${r}\` supplied to \`${a}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${N}\`.`}function J(r,a){return`Invalid prop \`value\` of value \`${r}\` supplied to \`${a}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${N} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`}function Y({onSuccess:r}){var i,o,l;const a=M(),{error:n,isSuccess:t,data:s}=L({refetchOnMount:!1,refetchOnWindowFocus:!1,queryKey:["me"],queryFn:()=>a(R)});return m.useEffect(()=>{t&&r()},[t,r]),n?e.jsx(u,{heading:"Oops",content:n.message}):t?s!=null&&s.currentUser?e.jsx(u,{heading:"Contributions",content:e.jsx(v,{heading:"Projects:",length:10,total:(i=s.currentUser.contributedProjects)==null?void 0:i.count,items:(l=(o=s.currentUser.contributedProjects)==null?void 0:o.nodes)==null?void 0:l.filter(Boolean).map(c=>({...c,url:c.webUrl}))})}):e.jsx("div",{children:"No user?"}):e.jsx(u,{heading:"Fetching contributions",content:e.jsx(j,{})})}function Z({onSuccess:r}){const{error:a,allUsers:n,isFetching:t,allFetched:s,progress:i,refetch:o}=T();return m.useEffect(()=>{s&&r()},[s,r]),a?e.jsx(u,{heading:"Oops",content:a.message}):s?e.jsx(u,{heading:"Colleagues",onRefresh:()=>void o(),refreshing:t,content:e.jsx(j,{users:n})}):e.jsx(u,{heading:e.jsxs("span",{className:"gap-sm flex items-baseline text-nowrap",children:[e.jsx(g,{children:"Loading colleagues"}),e.jsx("span",{className:"@container flex-1",children:e.jsx(F,{className:"@max-[40px]:hidden",value:i})})]}),content:e.jsx(j,{})})}function j({users:r}){const n=(r==null?void 0:r.filter(t=>!t.bot&&t.state==="active"))||Array(3).fill(void 0);return e.jsxs("ul",{className:"border-muted-foreground divide-y",children:[n.slice(0,3).map((t,s)=>e.jsx("li",{className:t&&"animate-fade-up",children:e.jsx(p,{user:t,className:"my-md",loading:!t})},t?t.username:s.toString())),V(r==null?void 0:r.length,3)&&e.jsx("li",{className:"animate-fade-up mt-6",children:e.jsxs(x,{className:"text-muted-foreground text-right",children:["and ",W(r==null?void 0:r.length,3)," others"]})})]})}function ee({onSuccess:r}){var l,c,f,y;const a=M(),{error:n,isSuccess:t,data:s}=L({refetchOnMount:!1,refetchOnWindowFocus:!1,queryKey:["me"],queryFn:()=>a(R)});if(m.useEffect(()=>{t&&r()},[t,r]),n)return e.jsx(u,{heading:"Oops",content:n.message});if(!t)return e.jsx(u,{heading:"Fetching Profile",content:e.jsx(p,{loading:!0})});if(!(s!=null&&s.currentUser))return e.jsx("div",{children:"No user?"});const i=(l=s.currentUser.groupMemberships)==null?void 0:l.nodes,o=(c=s.currentUser.projectMemberships)==null?void 0:c.nodes;return e.jsx(u,{heading:e.jsxs(g,{children:["Welcome"," ",e.jsx("span",{className:"text-accent-foreground text-nowrap",children:s.currentUser.name||s.currentUser.username})]}),content:e.jsxs("div",{className:"gap-sm flex flex-col",children:[e.jsx(p,{user:{...s.currentUser,state:"active",bot:!1}}),e.jsx(v,{heading:"Groups:",total:i==null?void 0:i.length,length:P(i==null?void 0:i.length,2),items:(f=i==null?void 0:i.map(d=>d==null?void 0:d.group))==null?void 0:f.filter(Boolean).map(d=>({...d,url:d.webUrl}))}),e.jsx(v,{heading:"Projects:",length:P(o==null?void 0:o.length,3),total:o==null?void 0:o.length,items:(y=o==null?void 0:o.map(d=>d==null?void 0:d.project))==null?void 0:y.filter(Boolean).map(d=>({...d,url:d.webUrl}))})]})})}function v({total:r,items:a=[],heading:n,length:t}){return t===0?null:e.jsxs("div",{className:"animate-fade-up",children:[e.jsxs(x,{className:"text-muted-foreground",children:[n," [",r,"]"]}),e.jsx("ul",{className:"mx-sm",children:a.slice(0,t).map(s=>e.jsx("li",{children:s.url?e.jsx("a",{href:s.url,target:"_blank",rel:"noreferrer",children:e.jsx(x,{children:s.name})}):e.jsx(x,{children:"p.name"})},s.id))})]})}function u({heading:r,content:a,onRefresh:n,refreshing:t}){return e.jsxs(_,{className:"max-w-[350px] flex-1 basis-[280px]",children:[e.jsx(B,{children:e.jsxs("div",{className:"flex justify-between",children:[e.jsx(q,{children:typeof r=="string"?e.jsx(g,{children:r}):r}),n&&e.jsx(E,{variant:"outline",size:"iconSm",onClick:n,children:e.jsx(D,{className:t?"animate-spin":""})})]})}),e.jsx(A,{children:a})]})}function oe(){const r=S(),[a,n]=m.useState([]),t=a.every(Boolean)&&a.length>2,s=m.useCallback(()=>n(i=>i.concat(!0)),[]);return e.jsxs("div",{className:"@container w-[100%] flex-1",children:[e.jsx("div",{className:"flex h-24 flex-col justify-center",children:t?e.jsx("div",{className:"animate-fade flex justify-center",children:e.jsx(E,{size:"lg",ping:!0,variant:"outline",onClick:()=>r({to:"/"}),children:"Launch"})}):e.jsx(g,{className:"animate-fade text-center",children:"Welcome, getting things set up..."})}),e.jsxs("div",{className:"gap-sm @min-5xl:gap-lg flex flex-wrap items-stretch justify-center",children:[e.jsx(ee,{onSuccess:s}),e.jsx(Z,{onSuccess:s}),e.jsx(Y,{onSuccess:s})]})]})}export{oe as default};
