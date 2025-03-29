import {User} from "./widgets/Users"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Progress} from "@/components/ui/progress"
import {Lead, Text} from "@/components/ui/text"
import {graphql} from "@/graphql"
import {useFetcher} from "@/hooks/fetcher/useFetcher"
import {Pages, useNavigation} from "@/hooks/useNav"
import {type IUser, useUsersQuery} from "@/hooks/useUsers"
import {gt, min, sub} from "@/lib/maths"
import {useQuery} from "@tanstack/react-query"
import {useState, useEffect, useCallback} from "react"

export default function Welcome() {
	const {nav} = useNavigation()
	const [ready, setReady] = useState<boolean[]>([])
	const allReady = ready.every(Boolean) && ready.length > 2
	const onSuccess = useCallback(() => setReady((s) => s.concat(true)), [])
	return (
		<div className="@container w-[100%] flex-1">
			<div className="flex h-24 flex-col justify-center">
				{allReady ? (
					<div className="animate-fade flex justify-center">
						<Button
							size="lg"
							ping
							variant="outline"
							onClick={() => nav(Pages.DASHBOARD)}
						>
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
		refetchOnWindowFocus: false,
		queryKey: ["me"],
		queryFn: () => fetcher(MyBioQuery),
	})

	useEffect(() => {
		if (isSuccess) onSuccess()
	}, [isSuccess, onSuccess])

	if (error) {
		return <PreviewCard heading="Oops" content={error.message} />
	}
	if (!isSuccess)
		return (
			<PreviewCard
				heading="Fetching contributions"
				content={<UsersPreview loading />}
			/>
		)

	if (!data?.currentUser) {
		return <div>No user?</div>
	}

	return (
		<PreviewCard
			heading="Contributions"
			content={
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
		return <PreviewCard heading="Oops" content={error.message} />
	}
	if (!allFetched)
		return (
			<PreviewCard
				heading={
					<span className="gap-sm flex items-baseline text-nowrap">
						<Lead>Loading colleagues</Lead>
						<span className="@container flex-1">
							<Progress className="@max-[40px]:hidden" value={progress} />
						</span>
					</span>
				}
				content={<UsersPreview loading />}
			/>
		)

	return (
		<PreviewCard
			heading="Colleagues"
			content={<UsersPreview loading={!allFetched} users={users} />}
		/>
	)
}

function UsersPreview(props: {loading: boolean; users?: IUser[]}) {
	const listLength = 3
	const users: (IUser | undefined)[] = (
		props.users || Array(listLength).fill(undefined)
	).slice(0, listLength)

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
			{gt(props?.users?.length, listLength) && (
				<li className="animate-fade-up mt-6">
					<Text className="text-muted-foreground text-right">
						and {sub(props?.users?.length, listLength)} others
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
		refetchOnWindowFocus: false,
		queryKey: ["me"],
		queryFn: () => fetcher(MyBioQuery),
	})

	useEffect(() => {
		if (isSuccess) onSuccess()
	}, [isSuccess, onSuccess])

	if (error) {
		return <PreviewCard heading="Oops" content={error.message} />
	}

	if (!isSuccess)
		return <PreviewCard heading="Fetching Profile" content={<User loading />} />

	if (!data?.currentUser) {
		return <div>No user?</div>
	}

	const groups = data.currentUser.groupMemberships?.nodes
	const projects = data.currentUser.projectMemberships?.nodes

	return (
		<PreviewCard
			heading={
				<span>
					Welcome{" "}
					<span className="text-accent-foreground text-nowrap">
						{data.currentUser.name || data.currentUser.username}
					</span>
				</span>
			}
			content={
				<div className="gap-sm flex flex-col">
					<User user={{...data.currentUser, state: "active", bot: false}} />
					<MyLists
						heading="Groups:"
						total={groups?.length}
						length={min(groups?.length, 2)}
						items={groups
							?.map((g) => g?.group)
							?.filter(Boolean)
							.map((n) => ({...n, url: n.webUrl}))}
					/>
					<MyLists
						heading="Projects:"
						length={min(projects?.length, 3)}
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

function PreviewCard({heading, content}: IChildrens<"heading" | "content">) {
	return (
		<Card className="max-w-[350px] flex-1 basis-[280px]">
			<CardHeader>
				<CardTitle>
					{typeof heading === "string" ? <Lead>{heading}</Lead> : heading}
				</CardTitle>
			</CardHeader>
			<CardContent>{content}</CardContent>
		</Card>
	)
}
