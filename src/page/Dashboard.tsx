import {User, useUsersQuery} from "./widgets/Users";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Lead, Text} from "@/components/ui/text";
import {graphql} from "@/graphql";
import {useConfigRequest} from "@/hooks/useConfig";
import {execute} from "@/utils/execute";
import {useQuery} from "@tanstack/react-query";
import {useState, useEffect, useCallback} from "react";
import {match, P} from "ts-pattern";

export function Dashboard() {
	const [ready, setReady] = useState<boolean[]>([]);
	const allReady = ready.every(Boolean) && ready.length > 2;
	const onSuccess = useCallback(() => setReady((s) => s.concat(true)), []);
	return (
		<div className="flex-1 w-[100%] ">
			<div className="h-8 my-4 flex flex-col justify-center">
				{allReady ? (
					<div className="flex justify-center">
						<Button variant="outline" className="animate-pulse">
							Launch
						</Button>
					</div>
				) : (
					<Lead className=" animate-fade text-center">
						Welcome, getting things set up...
					</Lead>
				)}
			</div>
			<div className=" flex flex-wrap justify-center items-stretch gap-8 ">
				<MyCard onSuccess={onSuccess} />
				<UsersCard onSuccess={onSuccess} />
				<ReposCard onSuccess={onSuccess} />
			</div>
		</div>
	);
}

interface ReadyProps {
	onSuccess: () => void;
}

function ReposCard({onSuccess}: ReadyProps) {
	const reqConf = useConfigRequest();
	const {error, isSuccess, data} = useQuery({
		refetchOnMount: false,
		queryKey: ["me"],
		queryFn: () => execute(reqConf, MyBioQuery),
	});

	useEffect(() => {
		if (isSuccess) onSuccess();
	}, [isSuccess, onSuccess]);

	if (error) {
		return <PreviewCard Heading="Oops" Content={error.message} />;
	}
	if (!isSuccess)
		return (
			<PreviewCard
				Heading="Fetching contributions"
				Content={<UsersPreview loading />}
			/>
		);

	if (!data?.currentUser) {
		return <div>No user?</div>;
	}

	return (
		<PreviewCard
			Heading="Contributions"
			Content={
				<MyLists
					heading="Projects:"
					length={10}
					items={data.currentUser.contributedProjects?.nodes
						?.filter(Boolean)
						.map((n) => ({...n, url: n.webUrl}))}
				/>
			}
		/>
	);
}

function UsersCard({onSuccess}: ReadyProps) {
	const {error, users, allFetched} = useUsersQuery();

	useEffect(() => {
		if (allFetched) onSuccess();
	}, [allFetched, onSuccess]);

	if (error) {
		return <PreviewCard Heading="Oops" Content={error.message} />;
	}
	if (!allFetched)
		return (
			<PreviewCard
				Heading="Loading colleagues"
				Content={<UsersPreview loading />}
			/>
		);

	return (
		<PreviewCard
			Heading="Colleagues"
			Content={<UsersPreview loading={!allFetched} users={users} />}
		/>
	);
}

function UsersPreview(props: {users?: User[]; loading: boolean}) {
	const listLength = 3;
	const loaded = match(props)
		.with({users: [], loading: false}, () => "empty" as const)
		.with({loading: true}, () => "loading" as const)
		.with({users: P.nonNullable}, ({users}) => users)
		.exhaustive();

	const [fading, setFading] = useState(loaded === "loading");
	const [users, setUsers] = useState<(User | undefined)[]>(
		Array.isArray(loaded)
			? loaded.slice(0, listLength)
			: Array(listLength).fill(undefined),
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

	if (loaded === "empty") return <Text>No users for this instance</Text>;

	return (
		<ul className="divide-y border-muted-foreground">
			{users.slice(0, listLength).map((user, i) => (
				<li
					key={user ? user.username : i.toString()}
					className={user && "animate-fade-up"}
				>
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
						id
						name
						webUrl
					}
				}
			}
			groupMemberships {
				nodes {
					group {
						id
						name
						webUrl
					}
				}
			}
			contributedProjects {
				count
				nodes {
					id
					name
					webUrl
				}
			}
		}
	}
`);

export function MyCard({onSuccess}: ReadyProps) {
	const reqConf = useConfigRequest();
	const {error, isSuccess, data} = useQuery({
		refetchOnMount: false,
		queryKey: ["me"],
		queryFn: () => execute(reqConf, MyBioQuery),
	});

	useEffect(() => {
		if (isSuccess) onSuccess();
	}, [isSuccess, onSuccess]);

	if (error) {
		return <PreviewCard Heading="Oops" Content={error.message} />;
	}

	if (!isSuccess)
		return (
			<PreviewCard Heading="Fetching Profile" Content={<User loading />} />
		);

	if (!data?.currentUser) {
		return <div>No user?</div>;
	}

	return (
		<PreviewCard
			Heading={`Welcome ${data.currentUser.username}`}
			Content={
				<div className="flex flex-col gap-4">
					<User user={{...data.currentUser, state: "active", bot: false}} />
					<MyLists
						heading="Groups:"
						items={data.currentUser.groupMemberships?.nodes
							?.map((g) => g?.group)
							?.filter(Boolean)
							.map((n) => ({...n, url: n.webUrl}))}
					/>
					<MyLists
						heading="Projects:"
						items={data.currentUser.projectMemberships?.nodes
							?.map((n) => n?.project)
							?.filter(Boolean)
							.map((n) => ({...n, url: n.webUrl}))}
					/>
				</div>
			}
		/>
	);
}

function MyLists({
	items = [],
	heading,
	length = 3,
}: {
	length?: number;
	heading: string;
	items?: {id: string; name: string; url?: string}[];
}) {
	return (
		<div className="animate-fade-up">
			<Text className="text-muted-foreground">
				{heading} [{items.length}]
			</Text>
			<ul className="mx-4">
				{items.slice(0, length).map((p) => (
					<li key={p.id}>
						{p.url ? (
							<a href={p.url} target="_blank" rel="noreferrer">
								<Text>{p.name}</Text>
							</a>
						) : (
							<Text>p.name</Text>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}

function PreviewCard({Heading, Content}: IChildrens<"Heading" | "Content">) {
	return (
		<Card className="flex-1 basis-[250px] max-w-[350px]">
			<CardHeader>
				<CardTitle>
					<Lead>{Heading}</Lead>
				</CardTitle>
			</CardHeader>
			<CardContent>{Content}</CardContent>
		</Card>
	);
}
