import{r as y,j as a,P as N,c as C,a as M,u as w,b as P,d as I,E as v,L as E,e as O,f as S}from"./index-CJ4OMWrp.js";import{g as U,C as _,a as k,b as F,c as T}from"./card-BCpgvOlz.js";var z="Separator",g="horizontal",A=["horizontal","vertical"],b=y.forwardRef((t,i)=>{const{decorative:l,orientation:n=g,...h}=t,r=L(n)?n:g,p=l?{role:"none"}:{"aria-orientation":r==="vertical"?r:void 0,role:"separator"};return a.jsx(N.div,{"data-orientation":r,...p,...h,ref:i})});b.displayName=z;function L(t){return A.includes(t)}var R=b;function $({className:t,orientation:i="horizontal",decorative:l=!0,...n}){return a.jsx(R,{"data-slot":"separator-root",decorative:l,orientation:i,className:C("bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",t),...n})}/**
 * @license lucide-react v0.482.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],B=M("Check",q),D=U(`
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
			authoredMergeRequests(first: 100) {
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
`);function G(){var f;const t=w(),{domain:i,user:l}=P(e=>e.gitlab),{isSuccess:n,isFetching:h,error:r,data:c,refetch:p}=I({queryKey:["myMrs"],refetchInterval:60*1e3,queryFn:()=>t(D,{draft:!0})});if(r)return a.jsx(v,{error:r});if(n&&!c.currentUser)return a.jsx(v,{error:"missing user"});if(!n)return a.jsx(E,{});const{assignedMergeRequests:s,authoredMergeRequests:d}=c.currentUser,o=(f=d==null?void 0:d.nodes)==null?void 0:f.concat(s==null?void 0:s.nodes).filter(Boolean).filter(O("id"));return a.jsx("div",{className:"@container w-[100%] flex-1",children:a.jsx("div",{className:"gap-sm @min-5xl:gap-lg flex flex-wrap items-stretch justify-center",children:a.jsxs(_,{className:"max-w-[350px] flex-1 basis-[280px]",children:[a.jsx(k,{children:a.jsx(F,{children:a.jsxs(S,{children:["total ",o==null?void 0:o.length]})})}),a.jsxs(T,{children:[a.jsxs("p",{children:["you have"," ",a.jsxs("a",{target:"_blank",href:`https://${i}/dashboard/merge_requests?assignee_username=${l}`,rel:"noreferrer",children:[s==null?void 0:s.count," open MRs"]})]}),a.jsx($,{}),a.jsx("ul",{children:o==null?void 0:o.map(e=>{var x,j;return a.jsx("li",{children:a.jsxs("div",{children:[a.jsxs("p",{children:[(e==null?void 0:e.webUrl)&&a.jsx("a",{href:e==null?void 0:e.webUrl,target:"_blank",rel:"noreferrer",children:e==null?void 0:e.title}),e!=null&&e.mergeable?a.jsxs("span",{children:[a.jsx(B,{color:"green"})," mergeable"]}):null]}),e!=null&&e.mergeable?null:a.jsxs("ul",{children:[e!=null&&e.conflicts?a.jsx("li",{children:"❌ conflicts"}):null,(x=e==null?void 0:e.headPipeline)!=null&&x.status?a.jsxs("li",{children:["Pipeline: ",e.headPipeline.status]}):null,e!=null&&e.approved?a.jsx("li",{children:"√ approved"}):null,((j=e==null?void 0:e.approvalState.invalidApproversRules)==null?void 0:j.filter(u=>!u.allowMergeWhenInvalid).map(u=>u.name).join(" "))??null]})]})},e==null?void 0:e.id)})})]})]})})})}function Q(){return a.jsx(G,{})}export{Q as default};
