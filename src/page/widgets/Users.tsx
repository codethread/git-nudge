import {Skeleton} from '@/components/ui/skeleton';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {Text, TextSkeleton} from '@/components/ui/text';
import {graphql} from '@/graphql';
import type {UsersQueryQuery} from '@/graphql/graphql';
import {useConfig} from '@/hooks/useConfig';
import {duration} from '@/lib/duration';
import {cn} from '@/lib/utils';
import {execute} from '@/utils/execute';
import {Avatar, AvatarFallback, AvatarImage} from '@radix-ui/react-avatar';
import {useInfiniteQuery} from '@tanstack/react-query';
import {useEffect, useMemo, useState} from 'react';
import {P, match} from 'ts-pattern';

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
				avatarUrl
				state
				name
				username
				bot
				webUrl
			}
		}
	}
`);

export type User = NN<NN<NN<UsersQueryQuery['users']>['nodes']>[number]>;

export const useUsersQuery = () => {
	const config = useConfig();
	const queryData = useInfiniteQuery({
		staleTime: duration(1, 'days'),
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		queryKey: ['usersAll'],
		initialPageParam: '',
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
		const fetched = data?.pages.map((p) => p.users?.nodes?.length ?? 0).reduce((a, b) => a + b);
		const progress = fetched ? fetched / count : 0;
		const allFetched = progress === 1;
		const users =
			data && allFetched ? data.pages.flatMap((p) => p.users?.nodes).filter(Boolean) : [];
		return {
			error,
			progress,
			isFetching,
			allFetched,
			allUsers: users,
			users: users.filter((u) => !u.bot && u.state === 'active'),
		};
	}, [queryData]);
};

interface UserProps {
	className?: string;
	loading?: boolean;
	user?: User;
}

export function UsersPreview(props: {users?: User[]; loading: boolean}) {
	const loaded = match(props)
		.with({users: [], loading: false}, () => 'empty' as const)
		.with({loading: true}, () => 'loading' as const)
		.with({users: P.nonNullable}, ({users}) => users)
		.exhaustive();

	const [fading, setFading] = useState(loaded === 'loading');
	const [users, setUsers] = useState<(User | undefined)[]>(
		Array.isArray(loaded) ? loaded : Array(3).fill(undefined),
	);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		if (index === 3) {
			setFading(false);
		}
		if (fading && Array.isArray(loaded)) {
			setTimeout(
				() => {
					console.log({index});
					setUsers((u) => {
						u[index] = loaded[index];
						return [...u];
					});
					setIndex((x) => x + 1);
				},
				index === 0 ? 0 : 500,
			);
		}
	}, [index, loaded, fading]);

	if (loaded === 'empty') return <Text>No users for this instance</Text>;

	return (
		<ul className="divide-y border-muted-foreground">
			{users.slice(0, 3).map((user, i) => (
				<li key={user ? user.username : i.toString()} className={user && 'animate-fade-up'}>
					<User user={user} className="my-6" loading={false} />
				</li>
			))}
		</ul>
	);
}

export function User(props: UserProps) {
	const user = match(props)
		.with({loading: true}, () => undefined)
		.with({user: P.select()}, (_) => _)
		.exhaustive();

	return (
		<div className={cn('flex items-center space-x-4', props.className)}>
			{user?.avatarUrl ? (
				<Avatar className="h-10 w-10 rounded-full overflow-clip flex justify-center items-center">
					<AvatarImage src={user.avatarUrl ?? undefined} />
					<AvatarFallback className="text-xl">{user.username.slice(0, 2)}</AvatarFallback>
				</Avatar>
			) : (
				<Skeleton className="h-10 w-10 rounded-full" />
			)}
			<div className="space-y-2">
				{user ? (
					<div>
						<Text flush>{user.name}</Text>
						<div className="flex">
							<Text flush>
								<span className="text-muted-foreground">{user.state}</span>
								{user.username === user.name ? '' : ` ${user.username}`}
							</Text>
						</div>
					</div>
				) : (
					<div>
						<TextSkeleton className="w-[100px]" />
						<TextSkeleton className="w-[100px]" />
					</div>
				)}
			</div>
		</div>
	);
}

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
					<TableHead className="w-[100px]">Name</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Username</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{users.map((user) => (
					<TableRow key={user.username}>
						<TableCell className="font-medium">
							<a
								className="text-blue-400 underline"
								href={user.webUrl}
								target="_blank"
								rel="noreferrer"
							>
								{user.name}
							</a>
						</TableCell>
						<TableCell>{user.state}</TableCell>
						<TableCell>{user.username}</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell>Total</TableCell>
					<TableCell>{isFetching ? 'fetching...' : ''}</TableCell>
					<TableCell className="text-right">{users.length}</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
}
