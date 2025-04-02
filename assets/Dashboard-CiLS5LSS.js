import{r as g,j as r,P as b,c as y,u as N,a as C,b as O,E as m,L as E,d as S,e as w}from"./index-BQfOMj_S.js";import{g as I,C as M,a as P,b as T,c as z}from"./card-CXh0xeHO.js";var A="Separator",j="horizontal",F=["horizontal","vertical"],v=g.forwardRef((t,s)=>{const{decorative:i,orientation:a=j,...u}=t,n=U(a)?a:j,f=i?{role:"none"}:{"aria-orientation":n==="vertical"?n:void 0,role:"separator"};return r.jsx(b.div,{"data-orientation":n,...f,...u,ref:s})});v.displayName=A;function U(t){return F.includes(t)}var k=v;function L({className:t,orientation:s="horizontal",decorative:i=!0,...a}){return r.jsx(k,{"data-slot":"separator-root",decorative:i,orientation:s,className:y("bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",t),...a})}const _=I(`
	query GetMyMrs {
		currentUser {
			id
			name
			# projectMemberships(first: 100) {
			# 	nodes {
			# 		project {
			# 			id
			# 			name
			# 			webUrl
			# 		}
			# 	}
			# }
			# assignedMergeRequests(first: 100, draft: $draft, state: opened) {
			# 	count
			# 	pageInfo {
			# 		hasNextPage
			# 		endCursor
			# 	}
			# 	# nodes {
			# 	# 	# ...MrFragment
			# 	# }
			# }
			authoredMergeRequests(first: 100) {
				count
				pageInfo {
					hasNextPage
					endCursor
				}
				nodes {
					...MRSmall
				}
			}
		}
	}

	fragment MRSmall on MergeRequest {
		id
		title
		createdAt
		# draft
		# mergeable
		# conflicts
		# userDiscussionsCount
		# userNotesCount
	}
`);function $(){var p,h,x;const t=N(),{domain:s,user:i}=C(d=>d.gitlab),{isSuccess:a,isFetching:u,error:n,data:c,refetch:f}=O({queryKey:["me"],refetchInterval:60*1e3,queryFn:()=>t(_,{draft:!0})});if(n)return r.jsx(m,{error:n});if(a&&!c.currentUser)return r.jsx(m,{error:"missing user"});if(!a)return r.jsx(E,{});const{assignedMergeRequests:o,authoredMergeRequests:e}=c.currentUser,l=(p=e==null?void 0:e.nodes)==null?void 0:p.concat(o==null?void 0:o.nodes).filter(Boolean).filter(S("id"));return console.log("codethread authored",(h=e==null?void 0:e.nodes)==null?void 0:h.map(d=>Object.keys(d||{}).length),Object.keys(((x=e==null?void 0:e.nodes)==null?void 0:x.at(0))||{}).join("|")),r.jsx("div",{className:"@container w-[100%] flex-1",children:r.jsx("div",{className:"gap-sm @min-5xl:gap-lg flex flex-wrap items-stretch justify-center",children:r.jsxs(M,{className:"max-w-[350px] flex-1 basis-[280px]",children:[r.jsx(P,{children:r.jsx(T,{children:r.jsxs(w,{children:["total ",l==null?void 0:l.length]})})}),r.jsxs(z,{children:[r.jsxs("p",{children:["you have"," ",r.jsxs("a",{target:"_blank",href:`https://${s}/dashboard/merge_requests?assignee_username=${i}`,rel:"noreferrer",children:[o==null?void 0:o.count," open MRs"]})]}),r.jsx(L,{})]})]})})})}function B(){return r.jsx($,{})}export{B as default};
