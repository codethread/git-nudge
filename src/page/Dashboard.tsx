import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Lead, Text} from '@/components/ui/text';
import {User, useUsersQuery} from './widgets/Users';
import {graphql} from '@/graphql';
import {useConfigRequest} from '@/hooks/useConfig';
import {execute} from '@/utils/execute';
import {useQuery} from '@tanstack/react-query';
import {MeQuery} from '@/graphql/graphql';
import {useState, useEffect} from 'react';
import {match, P} from 'ts-pattern';

export function Dashboard() {
	return (
		<div className="flex-1 w-[100%]">
			<Lead className="my-12 text-center">Welcome, getting things set up...</Lead>
			<div className="flex flex-wrap justify-center items-stretch gap-8">
				<MyCard />
				<UsersCard />
			</div>
		</div>
	);
}

function PreviewCard({Heading, Content}: IChildrens<'Heading' | 'Content'>) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<Lead>{Heading}</Lead>
				</CardTitle>
			</CardHeader>
			<CardContent>{Content}</CardContent>
		</Card>
	);
}

function UsersCard() {
	const {error, users, allFetched} = useUsersQuery();
	if (error) {
		return <PreviewCard Heading="Oops" Content={error.message} />;
	}
	if (!allFetched)
		return <PreviewCard Heading="Loading users" Content={<UsersPreview loading />} />;

	return (
		<PreviewCard Heading="Users" Content={<UsersPreview loading={!allFetched} users={users} />} />
	);
}

function UsersPreview(props: {users?: User[]; loading: boolean}) {
	const listLength = 3;
	const loaded = match(props)
		.with({users: [], loading: false}, () => 'empty' as const)
		.with({loading: true}, () => 'loading' as const)
		.with({users: P.nonNullable}, ({users}) => users)
		.exhaustive();

	const [fading, setFading] = useState(loaded === 'loading');
	const [users, setUsers] = useState<(User | undefined)[]>(
		Array.isArray(loaded) ? loaded.slice(0, listLength) : Array(listLength).fill(undefined),
	);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		if (index === listLength) {
			setFading(false);
		}
		if (fading && Array.isArray(loaded)) {
			setTimeout(
				() => {
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
			{users.slice(0, listLength).map((user, i) => (
				<li key={user ? user.username : i.toString()} className={user && 'animate-fade-up'}>
					<User user={user} className="my-6" loading={false} />
				</li>
			))}
			{props.users && !fading && props.users.length > listLength && (
				<li className="mt-6 animate-fade-up">
					<Text className="text-muted-foreground text-right">
						and {props.users.length - listLength} others
					</Text>
				</li>
			)}
		</ul>
	);
}

const MyBioQuery = graphql(`
query Me {
	 currentUser {
    name
    username
    webUrl
    avatarUrl
    projectMemberships(first: 3) {
      nodes {
        project {
          name
          webUrl
        }
      }
    }
    groupMemberships {
      nodes {
        group {
          name
        }
      }
    }
    contributedProjects {
      count
      nodes {
        name
      }
    }
  }
}
`);

export function MyCard() {
	const reqConf = useConfigRequest();
	const {error, isFetching, data} = useQuery({
		queryKey: ['me'],
		queryFn: () => execute(reqConf, MyBioQuery),
	});
	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<Lead>
						{error
							? 'Oops'
							: isFetching
								? 'Loading Profile'
								: `Hi there ${data?.currentUser?.username}`}
					</Lead>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<MyData error={error?.message} loading={isFetching} data={data} />
			</CardContent>
		</Card>
	);
}

function MyData({error, data, loading}: {error?: string; loading?: boolean; data?: MeQuery}) {
	if (error) return <p>{error}</p>;
	if (loading) return <User loading />;
	return <div></div>;
}
