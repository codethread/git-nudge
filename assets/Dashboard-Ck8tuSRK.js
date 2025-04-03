import{r as v,j as e,P as g,c as b,u as y,a as N,b as C,E as x,L as M,d as w,e as m}from"./index-DkAeFy-x.js";import{g as E,C as I,a as O,b as P,c as U}from"./card-FUNn3GG-.js";var F="Separator",p="horizontal",S=["horizontal","vertical"],j=v.forwardRef((a,i)=>{const{decorative:c,orientation:t=p,...u}=a,n=T(t)?t:p,f=c?{role:"none"}:{"aria-orientation":n==="vertical"?n:void 0,role:"separator"};return e.jsx(g.div,{"data-orientation":n,...f,...u,ref:i})});j.displayName=F;function T(a){return S.includes(a)}var z=j;function _({className:a,orientation:i="horizontal",decorative:c=!0,...t}){return e.jsx(z,{"data-slot":"separator-root",decorative:c,orientation:i,className:b("bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",a),...t})}const $=E(`
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
`);function q(){var h;const a=y(),{domain:i,user:c}=N(r=>r.gitlab),{isSuccess:t,isFetching:u,error:n,data:l,refetch:f}=C({queryKey:["myMrs"],refetchInterval:60*1e3,queryFn:()=>a($,{draft:!0})});if(n)return e.jsx(x,{error:n});if(!t)return e.jsx(M,{});if(!l.currentUser)return e.jsx(x,{error:"missing user"});const{assignedMergeRequests:s,authoredMergeRequests:d}=l.currentUser,o=(h=d==null?void 0:d.nodes)==null?void 0:h.concat(s==null?void 0:s.nodes).filter(Boolean).filter(w("id"));return e.jsx("div",{className:"@container w-[100%] flex-1",children:e.jsx("div",{className:"gap-sm @min-5xl:gap-lg flex flex-wrap items-stretch justify-center",children:e.jsxs(I,{className:"max-w-[350px] flex-1 basis-[280px]",children:[e.jsx(O,{children:e.jsx(P,{children:e.jsxs(m,{children:["total ",o==null?void 0:o.length]})})}),e.jsxs(U,{children:[e.jsxs("p",{children:["you have"," ",e.jsxs("a",{target:"_blank",href:`https://${i}/dashboard/merge_requests?assignee_username=${c}`,rel:"noreferrer",children:[s==null?void 0:s.count," open MRs"]})]}),e.jsx(_,{}),e.jsx("ul",{children:o==null?void 0:o.map(r=>e.jsx("li",{children:e.jsx("div",{children:e.jsx("p",{className:"truncate",children:(r==null?void 0:r.webUrl)&&e.jsx("a",{href:r==null?void 0:r.webUrl,target:"_blank",rel:"noreferrer",children:r==null?void 0:r.title})})})},r==null?void 0:r.id))})]})]})})})}function R(){return e.jsx(q,{})}export{R as default};
