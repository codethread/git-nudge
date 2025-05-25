import{g as v,c as x}from"./avatar-oWXMAh7x.js";import{i as p,h as b,d as N,e as y,r as m}from"./index-Blh_3CCp.js";import{Q as F,a as M}from"./useQuery-CJtX6N2R.js";var R=class extends F{constructor(e,t){super(e,t)}bindMethods(){super.bindMethods(),this.fetchNextPage=this.fetchNextPage.bind(this),this.fetchPreviousPage=this.fetchPreviousPage.bind(this)}setOptions(e,t){super.setOptions({...e,behavior:p()},t)}getOptimisticResult(e){return e.behavior=p(),super.getOptimisticResult(e)}fetchNextPage(e){return this.fetch({...e,meta:{fetchMore:{direction:"forward"}}})}fetchPreviousPage(e){return this.fetch({...e,meta:{fetchMore:{direction:"backward"}}})}createResult(e,t){var f,d;const{state:r}=e,s=super.createResult(e,t),{isFetching:g,isRefetching:l,isError:o,isRefetchError:P}=s,i=(d=(f=r.fetchMeta)==null?void 0:f.fetchMore)==null?void 0:d.direction,n=o&&i==="forward",h=g&&i==="forward",u=o&&i==="backward",a=g&&i==="backward";return{...s,fetchNextPage:this.fetchNextPage,fetchPreviousPage:this.fetchPreviousPage,hasNextPage:N(t,r.data),hasPreviousPage:b(t,r.data),isFetchNextPageError:n,isFetchingNextPage:h,isFetchPreviousPageError:u,isFetchingPreviousPage:a,isRefetchError:P&&!n&&!u,isRefetching:l&&!h&&!a}}};function w(e,t){return M(e,R)}const O=v(`
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
`),q=()=>{const e=x(),t=w({staleTime:y(1,"days"),refetchOnMount:!1,refetchOnWindowFocus:!1,queryKey:["usersAll"],initialPageParam:"",queryFn:({pageParam:r})=>e(O,{cursor:r}),getNextPageParam:({users:r})=>{var s;return r!=null&&r.pageInfo.hasNextPage?(s=r==null?void 0:r.pageInfo)==null?void 0:s.endCursor:null}});return m.useEffect(()=>{t.hasNextPage&&t.fetchNextPage()},[t]),m.useMemo(()=>{var h,u;const{error:r,data:s,isFetching:g}=t,l=((u=(h=s==null?void 0:s.pages.at(0))==null?void 0:h.users)==null?void 0:u.count)??0,o=s==null?void 0:s.pages.map(a=>{var c,f;return((f=(c=a.users)==null?void 0:c.nodes)==null?void 0:f.length)??0}).reduce((a,c)=>a+c),P=(o?o/l:0)*100,i=P===100,n=s&&i?s.pages.flatMap(a=>{var c;return(c=a.users)==null?void 0:c.nodes}).filter(Boolean):[];return{error:r,progress:P,isFetching:g,allFetched:i,allUsers:n,refetch:t.refetch,users:n.filter(a=>!a.bot&&a.state==="active")}},[t])};export{q as u};
