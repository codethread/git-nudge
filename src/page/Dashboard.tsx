import {User} from "./widgets/Users"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Progress} from "@/components/ui/progress"
import {Lead, Text} from "@/components/ui/text"
import {graphql} from "@/graphql"
import {useFetcher} from "@/hooks/fetcher/useFetcher"
import {type IUser, useUsersQuery} from "@/hooks/useUsers"
import {useQuery} from "@tanstack/react-query"
import {useState, useEffect, useCallback} from "react"

export function Dashboard() {
	const [ready, setReady] = useState<boolean[]>([])
	const allReady = ready.every(Boolean) && ready.length > 2
	const onSuccess = useCallback(() => setReady((s) => s.concat(true)), [])
	return (
		<div className="@container w-[100%] flex-1">
			<div className="flex h-24 flex-col justify-center">
				{allReady ? (
					<div className="flex justify-center">
						<Button ping variant="outline">
							Launch
						</Button>
					</div>
				) : (
					<Lead className="animate-fade text-center">
						Welcome, getting things set up...
					</Lead>
				)}
			</div>
			<div className="gap-sm @min-5xl:gap-lg flex flex-wrap items-stretch justify-center">
				<MyCard onSuccess={onSuccess} />
				<UsersCard onSuccess={onSuccess} />
				<ReposCard onSuccess={onSuccess} />
			</div>
		</div>
	)
}

interface ReadyProps {
	onSuccess: () => void
}

function ReposCard({onSuccess}: ReadyProps) {
	const fetcher = useFetcher()
	const {error, isSuccess, data} = useQuery({
		refetchOnMount: false,
		queryKey: ["me"],
		queryFn: () => fetcher(MyBioQuery),
	})

	useEffect(() => {
		if (isSuccess) onSuccess()
	}, [isSuccess, onSuccess])

	if (error) {
		return <PreviewCard Heading="Oops" Content={error.message} />
	}
	if (!isSuccess)
		return (
			<PreviewCard
				Heading="Fetching contributions"
				Content={<UsersPreview loading />}
			/>
		)

	if (!data?.currentUser) {
		return <div>No user?</div>
	}

	return (
		<PreviewCard
			Heading="Contributions"
			Content={
				<MyLists
					heading="Projects:"
					length={10}
					total={data.currentUser.contributedProjects?.count}
					items={data.currentUser.contributedProjects?.nodes
						?.filter(Boolean)
						.map((n) => ({...n, url: n.webUrl}))}
				/>
			}
		/>
	)
}

function UsersCard({onSuccess}: ReadyProps) {
	const {error, users, allFetched, progress} = useUsersQuery()

	useEffect(() => {
		if (allFetched) onSuccess()
	}, [allFetched, onSuccess])

	if (error) {
		return <PreviewCard Heading="Oops" Content={error.message} />
	}
	if (!allFetched)
		return (
			<PreviewCard
				Heading={
					<span className="gap-sm flex items-baseline text-nowrap">
						Loading colleagues
						<span className="@container flex-1">
							<Progress className="@max-[40px]:hidden" value={progress} />
						</span>
					</span>
				}
				Content={<UsersPreview loading />}
			/>
		)

	return (
		<PreviewCard
			Heading="Colleagues"
			Content={<UsersPreview loading={!allFetched} users={users} />}
		/>
	)
}

function UsersPreview(props: {loading: boolean; users?: IUser[]}) {
	const listLength = 3
	const users: (IUser | undefined)[] = (
		props.users || Array(listLength).fill(undefined)
	).slice(0, listLength)
	console.log("codethread", props)

	return (
		<ul className="border-muted-foreground divide-y">
			{users.map((user, i) => (
				<li
					key={user ? user.username : i.toString()}
					className={user && "animate-fade-up"}
				>
					<User user={user} className="my-md" loading={!user} />
				</li>
			))}
			{(props?.users?.length || 0) > listLength && (
				<li className="animate-fade-up mt-6">
					<Text className="text-muted-foreground text-right">
						and {props?.users?.length - listLength} others
					</Text>
				</li>
			)}
		</ul>
	)
}

const MyBioQuery = graphql(`
	query GetMe {
		currentUser {
			id
			name
			username
			webUrl
			avatarUrl
			projectMemberships(first: 100) {
				nodes {
					project {
						id
						name
						webUrl
					}
				}
			}
			groupMemberships(first: 100) {
				nodes {
					group {
						id
						name
						webUrl
					}
				}
			}
			contributedProjects(first: 100) {
				count
				nodes {
					id
					name
					webUrl
				}
			}
		}
	}
`)

export function MyCard({onSuccess}: ReadyProps) {
	const fetcher = useFetcher()
	const {error, isSuccess, data} = useQuery({
		refetchOnMount: false,
		queryKey: ["me"],
		queryFn: () => fetcher(MyBioQuery),
	})

	useEffect(() => {
		if (isSuccess) onSuccess()
	}, [isSuccess, onSuccess])

	if (error) {
		return <PreviewCard Heading="Oops" Content={error.message} />
	}

	if (!isSuccess)
		return <PreviewCard Heading="Fetching Profile" Content={<User loading />} />

	if (!data?.currentUser) {
		return <div>No user?</div>
	}

	const groups = data.currentUser.groupMemberships?.nodes
	const projects = data.currentUser.projectMemberships?.nodes

	return (
		<PreviewCard
			Heading={
				<span>
					Welcome{" "}
					<span className="text-accent-foreground text-nowrap">
						{data.currentUser.name || data.currentUser.username}
					</span>
				</span>
			}
			Content={
				<div className="gap-sm flex flex-col">
					<User user={{...data.currentUser, state: "active", bot: false}} />
					<MyLists
						heading="Groups:"
						total={groups?.length}
						length={Math.min(groups?.length ?? 0, 2)}
						items={groups
							?.map((g) => g?.group)
							?.filter(Boolean)
							.map((n) => ({...n, url: n.webUrl}))}
					/>
					<MyLists
						heading="Projects:"
						length={Math.min(projects?.length ?? 0, 3)}
						total={projects?.length}
						items={projects
							?.map((n) => n?.project)
							?.filter(Boolean)
							.map((n) => ({...n, url: n.webUrl}))}
					/>
				</div>
			}
		/>
	)
}

function MyLists({
	total,
	items = [],
	heading,
	length,
}: {
	heading: string
	length: number
	total?: number
	items?: {id: string; name: string; url?: string}[]
}) {
	if (length === 0) return null

	return (
		<div className="animate-fade-up">
			<Text className="text-muted-foreground">
				{heading} [{total}]
			</Text>
			<ul className="mx-sm">
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
	)
}

function PreviewCard({Heading, Content}: IChildrens<"Heading" | "Content">) {
	return (
		<Card className="max-w-[350px] flex-1 basis-[280px]">
			<CardHeader>
				<CardTitle>
					<Lead>{Heading}</Lead>
				</CardTitle>
			</CardHeader>
			<CardContent>{Content}</CardContent>
		</Card>
	)
}
