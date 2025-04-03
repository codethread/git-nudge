import {UsersQuery} from "./users.gql"
import type {GetUsersQuery} from "@/graphql/graphql"
import {useFetcher} from "@/hooks/fetcher/useFetcher"
import {duration} from "@/lib/duration"
import {useInfiniteQuery} from "@tanstack/react-query"
import {useEffect, useMemo} from "react"

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
		const progress = (fetched ? fetched / count : 0) * 100
		const allFetched = progress === 100
		const users =
			data && allFetched
				? data.pages.flatMap((p) => p.users?.nodes).filter(Boolean)
				: []
		// console.log(
		// 	"codethread assigned",
		// 	users.at(0)?.name,
		// 	users.at(0)?.assignedMergeRequests,
		// 	users.at(0)?.assignedMergeRequests?.nodes,
		// )
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
