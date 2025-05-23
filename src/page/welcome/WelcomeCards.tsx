import {Button} from "@/components/ui/button"
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card"
import {Lead, Text} from "@/components/ui/text"
import {useFetcher} from "@/hooks/fetcher/useFetcher"
import {useUsersQuery, type IUser} from "@/hooks/users/useUsers"
import {gt, sub, min} from "@/lib/maths"
import {MyBioQuery} from "@/page/welcome/welcome.gql"
import {User} from "@/page/widgets/Users"
import {Progress} from "@radix-ui/react-progress"
import {useQuery} from "@tanstack/react-query"
import {RefreshCw} from "lucide-react"
import {useEffect} from "react"

interface ReadyProps {
	onSuccess: () => void
}

export function ReposCard({onSuccess}: ReadyProps) {
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
				content={<UsersPreview />}
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

export function UsersCard({onSuccess}: ReadyProps) {
	const {error, allUsers, isFetching, allFetched, progress, refetch} =
		useUsersQuery()

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
				content={<UsersPreview />}
			/>
		)

	return (
		<PreviewCard
			heading="Colleagues"
			onRefresh={() => void refetch()}
			refreshing={isFetching}
			content={<UsersPreview users={allUsers} />}
		/>
	)
}

function UsersPreview({users}: {users?: IUser[]}) {
	const listLength = 3
	const activeUsers =
		users?.filter((u) => !u.bot && u.state === "active") ||
		Array<undefined>(listLength).fill(undefined)

	return (
		<ul className="border-muted-foreground divide-y">
			{activeUsers.slice(0, listLength).map((user, i) => (
				<li
					key={user ? user.username : i.toString()}
					className={user && "animate-fade-up"}
				>
					<User user={user} className="my-md" loading={!user} />
				</li>
			))}
			{gt(users?.length, listLength) && (
				<li className="animate-fade-up mt-6">
					<Text className="text-muted-foreground text-right">
						and {sub(users?.length, listLength)} others
					</Text>
				</li>
			)}
		</ul>
	)
}

export function MyCard({onSuccess}: ReadyProps) {
	const fetcher = useFetcher()
	const {error, isSuccess, data} = useQuery({
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		queryKey: ["me"],
		queryFn: () => fetcher(MyBioQuery),
	})

	useEffect(() => {
		if (isSuccess) {
			onSuccess()
		}
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
	// console.log("currentUser", data.currentUser)
	// console.log(
	// 	"currentUser.projectMemberships",
	// 	data.currentUser?.projectMemberships,
	// )
	// console.log(
	// 	"currentUser.contributedProjects",
	// 	data.currentUser?.contributedProjects,
	// )

	return (
		<PreviewCard
			heading={
				<Lead>
					Welcome{" "}
					<span className="text-accent-foreground text-nowrap">
						{data.currentUser.name || data.currentUser.username}
					</span>
				</Lead>
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

function PreviewCard({
	heading,
	content,
	onRefresh,
	refreshing,
}: IChildrens<"heading" | "content"> & {
	onRefresh?: IAction
	refreshing?: boolean
}) {
	return (
		<Card className="max-w-[350px] flex-1 basis-[280px]">
			<CardHeader>
				<div className="flex justify-between">
					<CardTitle>
						{typeof heading === "string" ? <Lead>{heading}</Lead> : heading}
					</CardTitle>
					{onRefresh && (
						<Button variant={"outline"} size="iconSm" onClick={onRefresh}>
							<RefreshCw className={refreshing ? "animate-spin" : ""} />
						</Button>
					)}
				</div>
			</CardHeader>
			<CardContent>{content}</CardContent>
		</Card>
	)
}
