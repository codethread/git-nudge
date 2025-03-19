import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {graphql} from "@/graphql";
import {useConfig} from "@/hooks/useConfig";
import {duration} from "@/lib/duration";
import {execute} from "@/utils/execute";
import {useInfiniteQuery} from "@tanstack/react-query";
import {useEffect, useMemo} from "react";

// TODO: right now a blunt hammer, can offer more control if needed

const UsersQuery = graphql(`
	query UsersQuery($cursor: String) {
		users(after: $cursor, first: 10) {
			count
			pageInfo {
				hasNextPage
				endCursor
			}
			nodes {
				state
				name
				username
				bot
				webUrl
			}
		}
	}
`);

export const useUsersQuery = () => {
	const config = useConfig();
	const queryData = useInfiniteQuery({
		staleTime: duration(1, "days"),
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		queryKey: ["usersAll"],
		initialPageParam: "",
		queryFn: ({pageParam}) => execute(config, UsersQuery, {cursor: pageParam}),
		getNextPageParam: ({users}) =>
			users?.pageInfo.hasNextPage ? users?.pageInfo?.endCursor : null,
	});

	useEffect(() => {
		if (queryData.hasNextPage) {
			queryData.fetchNextPage();
		}
	}, [queryData]);

	return useMemo(() => {
		const {error, data, isFetching} = queryData;
		const count = data?.pages.at(0)?.users?.count ?? 0;
		const fetched = data?.pages
			.map((p) => p.users?.nodes?.length ?? 0)
			.reduce((a, b) => a + b);
		const progress = fetched ? fetched / count : 0;
		const allFetched = progress === 1;
		const users =
			data && allFetched
				? data.pages.flatMap((p) => p.users?.nodes).filter(Boolean)
				: [];
		return {
			error,
			progress,
			isFetching,
			allFetched,
			users,
		};
	}, [queryData]);
};

export function Users() {
	const {isFetching, error, users} = useUsersQuery();

	if (error) {
		return <div>{error.message}</div>;
	}

	return (
		<Table>
			<TableCaption>Users in this GitLab instance</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Username</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Name</TableHead>
					<TableHead className="text-right">Profile</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{users.map((user) => (
					<TableRow key={user.username}>
						<TableCell className="font-medium">{user.name}</TableCell>
						<TableCell>{user.state}</TableCell>
						<TableCell>{user.username}</TableCell>
						<TableCell className="text-right">{user.webUrl}</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={2}>Total</TableCell>
					<TableCell>{isFetching ? "fetching..." : ""}</TableCell>
					<TableCell className="text-right">{users.length}</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
}
