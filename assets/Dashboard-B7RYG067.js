import{r as g,j as a,P as y,c as N,u as w,a as P,b as C,L as I}from"./index-ySmlXLLv.js";import{g as O,C as S,a as U,b as E,c as F,d as M}from"./maths-DBVxLnsE.js";var T="Separator",v="horizontal",z=["horizontal","vertical"],b=g.forwardRef((t,o)=>{const{decorative:i,orientation:s=v,...u}=t,c=A(s)?s:v,h=i?{role:"none"}:{"aria-orientation":c==="vertical"?c:void 0,role:"separator"};return a.jsx(y.div,{"data-orientation":c,...h,...u,ref:o})});b.displayName=T;function A(t){return z.includes(t)}var _=b;function $({className:t,orientation:o="horizontal",decorative:i=!0,...s}){return a.jsx(_,{"data-slot":"separator-root",decorative:i,orientation:o,className:N("bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",t),...s})}const k=O(`
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
			authoredMergeRequests {
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
`);function D(){var x;const t=w(),{domain:o,user:i}=P(e=>e.gitlab),{isSuccess:s,isFetching:u,error:c,data:l,refetch:h}=C({queryKey:["me"],refetchInterval:60*1e3,queryFn:()=>t(k,{draft:!0})});if(!(l!=null&&l.currentUser))return null;const{assignedMergeRequests:n,authoredMergeRequests:r}=l.currentUser,d=(x=r==null?void 0:r.nodes)==null?void 0:x.concat(n==null?void 0:n.nodes).filter(Boolean);return a.jsx("div",{className:"@container w-[100%] flex-1",children:a.jsx("div",{className:"gap-sm @min-5xl:gap-lg flex flex-wrap items-stretch justify-center",children:a.jsxs(S,{className:"max-w-[350px] flex-1 basis-[280px]",children:[a.jsx(U,{children:a.jsx(E,{children:a.jsxs(I,{children:["total"," ",F(n==null?void 0:n.count,r==null?void 0:r.count)]})})}),a.jsxs(M,{children:[a.jsxs("p",{children:["you have"," ",a.jsxs("a",{target:"_blank",href:`https://${o}/dashboard/merge_requests?assignee_username=${i}`,rel:"noreferrer",children:[n==null?void 0:n.count," open MRs"]})]}),a.jsx($,{}),a.jsx("ul",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:d==null?void 0:d.map(e=>{var f,j;return a.jsx("li",{children:a.jsxs("div",{style:{border:"solid thin coral",borderRadius:"8px",padding:"8px"},children:[a.jsxs("p",{children:[(e==null?void 0:e.webUrl)&&a.jsx("a",{href:e==null?void 0:e.webUrl,target:"_blank",rel:"noreferrer",children:e==null?void 0:e.title}),e!=null&&e.mergeable?a.jsx("span",{children:" √ mergeable"}):null]}),e!=null&&e.mergeable?null:a.jsxs("ul",{children:[e!=null&&e.conflicts?a.jsx("li",{children:"❌ conflicts"}):null,(f=e==null?void 0:e.headPipeline)!=null&&f.status?a.jsxs("li",{children:["Pipeline: ",e.headPipeline.status]}):null,e!=null&&e.approved?a.jsx("li",{children:"√ approved"}):null,((j=e==null?void 0:e.approvalState.invalidApproversRules)==null?void 0:j.filter(p=>!p.allowMergeWhenInvalid).map(p=>p.name).join(" "))??null]})]})},e==null?void 0:e.id)})})]})]})})})}function G(){return a.jsx(D,{})}export{G as default};
