import {useFetcher} from "./fetcher/useFetcher"
import {graphql} from "@/graphql"
import type {GetUsersQuery} from "@/graphql/graphql"
import {duration} from "@/lib/duration"
import {useInfiniteQuery} from "@tanstack/react-query"
import {useEffect, useMemo} from "react"

// TODO: right now a blunt hammer, can offer more control if needed
const UsersQuery = graphql(`
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
`)

export type IUser = MaybeNot<
	NN<NN<NN<GetUsersQuery["users"]>["nodes"]>[number]>
>

export const useUsersQuery = () => {
	const fetcher = useFetcher()
	const queryData = useInfiniteQuery({
		staleTime: duration(1, "days"),
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		queryKey: ["usersAll"],
		initialPageParam: "",
		queryFn: ({pageParam}) => fetcher(UsersQuery, {cursor: pageParam}),
		getNextPageParam: ({users}) =>
			users?.pageInfo.hasNextPage ? users?.pageInfo?.endCursor : null,
	})

	useEffect(() => {
		const page = queryData.data?.pages.at(0)?.users
		console.log("pageInfo")
		console.log(page?.pageInfo)
		console.log("count")
		console.log(page?.count)
		console.log("nodes")
		page?.nodes?.forEach((e) => console.log(e))
		if (queryData.hasNextPage) {
			queryData.fetchNextPage()
		}
	}, [queryData])

	return useMemo(() => {
		const {error, data, isFetching} = queryData
		const count = data?.pages.at(0)?.users?.count ?? 0
		const fetched = data?.pages
			.map((p) => p.users?.nodes?.length ?? 0)
			.reduce((a, b) => a + b)
		const progress = fetched ? fetched / count : 0
		const allFetched = progress === 1
		const users =
			data && allFetched
				? data.pages.flatMap((p) => p.users?.nodes).filter(Boolean)
				: []
		return {
			error,
			progress,
			isFetching,
			allFetched,
			allUsers: users,
			users: users.filter((u) => !u.bot && u.state === "active"),
		}
	}, [queryData])
}
