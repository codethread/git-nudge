import{r as m,j as e,o as $,P as C,u as M,b as L,e as g,B as R,T as x,n as A,p as B}from"./index-CFXwmG4p.js";import{C as I,a as _,b as q,c as D}from"./card-aFlg9EbY.js";import{U as p,u as T,R as V}from"./Users-CSOFPNtK.js";import{m as y,g as W,s as k}from"./maths-Bni7feuY.js";import{g as G}from"./gql-CR52WJCt.js";const E=G(`
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
`);var b="Progress",N=100,[Q,oe]=$(b),[z,H]=Q(b),O=m.forwardRef((r,n)=>{const{__scopeProgress:a,value:t=null,max:s,getValueLabel:i=X,...o}=r;(s||s===0)&&!U(s)&&console.error(J(`${s}`,"Progress"));const l=U(s)?s:N;t!==null&&!w(t,l)&&console.error(Y(`${t}`,"Progress"));const c=w(t,l)?t:null,f=h(c)?i(c,l):void 0;return e.jsx(z,{scope:a,value:c,max:l,children:e.jsx(C.div,{"aria-valuemax":l,"aria-valuemin":0,"aria-valuenow":h(c)?c:void 0,"aria-valuetext":f,role:"progressbar","data-state":S(c,l),"data-value":c??void 0,"data-max":l,...o,ref:n})})});O.displayName=b;var F="ProgressIndicator",K=m.forwardRef((r,n)=>{const{__scopeProgress:a,...t}=r,s=H(F,a);return e.jsx(C.div,{"data-state":S(s.value,s.max),"data-value":s.value??void 0,"data-max":s.max,...t,ref:n})});K.displayName=F;function X(r,n){return`${Math.round(r/n*100)}%`}function S(r,n){return r==null?"indeterminate":r===n?"complete":"loading"}function h(r){return typeof r=="number"}function U(r){return h(r)&&!isNaN(r)&&r>0}function w(r,n){return h(r)&&!isNaN(r)&&r<=n&&r>=0}function J(r,n){return`Invalid prop \`max\` of value \`${r}\` supplied to \`${n}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${N}\`.`}function Y(r,n){return`Invalid prop \`value\` of value \`${r}\` supplied to \`${n}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${N} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`}function Z({onSuccess:r}){var i,o,l;const n=M(),{error:a,isSuccess:t,data:s}=L({refetchOnMount:!1,refetchOnWindowFocus:!1,queryKey:["me"],queryFn:()=>n(E)});return m.useEffect(()=>{t&&r()},[t,r]),a?e.jsx(u,{heading:"Oops",content:a.message}):t?s!=null&&s.currentUser?e.jsx(u,{heading:"Contributions",content:e.jsx(v,{heading:"Projects:",length:10,total:(i=s.currentUser.contributedProjects)==null?void 0:i.count,items:(l=(o=s.currentUser.contributedProjects)==null?void 0:o.nodes)==null?void 0:l.filter(Boolean).map(c=>({...c,url:c.webUrl}))})}):e.jsx("div",{children:"No user?"}):e.jsx(u,{heading:"Fetching contributions",content:e.jsx(j,{})})}function ee({onSuccess:r}){const{error:n,allUsers:a,isFetching:t,allFetched:s,progress:i,refetch:o}=T();return m.useEffect(()=>{s&&r()},[s,r]),n?e.jsx(u,{heading:"Oops",content:n.message}):s?e.jsx(u,{heading:"Colleagues",onRefresh:()=>void o(),refreshing:t,content:e.jsx(j,{users:a})}):e.jsx(u,{heading:e.jsxs("span",{className:"gap-sm flex items-baseline text-nowrap",children:[e.jsx(g,{children:"Loading colleagues"}),e.jsx("span",{className:"@container flex-1",children:e.jsx(O,{className:"@max-[40px]:hidden",value:i})})]}),content:e.jsx(j,{})})}function j({users:r}){const a=(r==null?void 0:r.filter(t=>!t.bot&&t.state==="active"))||Array(3).fill(void 0);return e.jsxs("ul",{className:"border-muted-foreground divide-y",children:[a.slice(0,3).map((t,s)=>e.jsx("li",{className:t&&"animate-fade-up",children:e.jsx(p,{user:t,className:"my-md",loading:!t})},t?t.username:s.toString())),W(r==null?void 0:r.length,3)&&e.jsx("li",{className:"animate-fade-up mt-6",children:e.jsxs(x,{className:"text-muted-foreground text-right",children:["and ",k(r==null?void 0:r.length,3)," others"]})})]})}function re({onSuccess:r}){var l,c,f,P;const n=M(),{error:a,isSuccess:t,data:s}=L({refetchOnMount:!1,refetchOnWindowFocus:!1,queryKey:["me"],queryFn:()=>n(E)});if(m.useEffect(()=>{t&&r()},[t,r]),a)return e.jsx(u,{heading:"Oops",content:a.message});if(!t)return e.jsx(u,{heading:"Fetching Profile",content:e.jsx(p,{loading:!0})});if(!(s!=null&&s.currentUser))return e.jsx("div",{children:"No user?"});const i=(l=s.currentUser.groupMemberships)==null?void 0:l.nodes,o=(c=s.currentUser.projectMemberships)==null?void 0:c.nodes;return e.jsx(u,{heading:e.jsxs(g,{children:["Welcome"," ",e.jsx("span",{className:"text-accent-foreground text-nowrap",children:s.currentUser.name||s.currentUser.username})]}),content:e.jsxs("div",{className:"gap-sm flex flex-col",children:[e.jsx(p,{user:{...s.currentUser,state:"active",bot:!1}}),e.jsx(v,{heading:"Groups:",total:i==null?void 0:i.length,length:y(i==null?void 0:i.length,2),items:(f=i==null?void 0:i.map(d=>d==null?void 0:d.group))==null?void 0:f.filter(Boolean).map(d=>({...d,url:d.webUrl}))}),e.jsx(v,{heading:"Projects:",length:y(o==null?void 0:o.length,3),total:o==null?void 0:o.length,items:(P=o==null?void 0:o.map(d=>d==null?void 0:d.project))==null?void 0:P.filter(Boolean).map(d=>({...d,url:d.webUrl}))})]})})}function v({total:r,items:n=[],heading:a,length:t}){return t===0?null:e.jsxs("div",{className:"animate-fade-up",children:[e.jsxs(x,{className:"text-muted-foreground",children:[a," [",r,"]"]}),e.jsx("ul",{className:"mx-sm",children:n.slice(0,t).map(s=>e.jsx("li",{children:s.url?e.jsx("a",{href:s.url,target:"_blank",rel:"noreferrer",children:e.jsx(x,{children:s.name})}):e.jsx(x,{children:"p.name"})},s.id))})]})}function u({heading:r,content:n,onRefresh:a,refreshing:t}){return e.jsxs(I,{className:"max-w-[350px] flex-1 basis-[280px]",children:[e.jsx(_,{children:e.jsxs("div",{className:"flex justify-between",children:[e.jsx(q,{children:typeof r=="string"?e.jsx(g,{children:r}):r}),a&&e.jsx(R,{variant:"outline",size:"iconSm",onClick:a,children:e.jsx(V,{className:t?"animate-spin":""})})]})}),e.jsx(D,{children:n})]})}function le(){const{nav:r}=A(),[n,a]=m.useState([]),t=n.every(Boolean)&&n.length>2,s=m.useCallback(()=>a(i=>i.concat(!0)),[]);return e.jsxs("div",{className:"@container w-[100%] flex-1",children:[e.jsx("div",{className:"flex h-24 flex-col justify-center",children:t?e.jsx("div",{className:"animate-fade flex justify-center",children:e.jsx(R,{size:"lg",ping:!0,variant:"outline",onClick:()=>r(B.DASHBOARD),children:"Launch"})}):e.jsx(g,{className:"animate-fade text-center",children:"Welcome, getting things set up..."})}),e.jsxs("div",{className:"gap-sm @min-5xl:gap-lg flex flex-wrap items-stretch justify-center",children:[e.jsx(re,{onSuccess:s}),e.jsx(ee,{onSuccess:s}),e.jsx(Z,{onSuccess:s})]})]})}export{le as default};
