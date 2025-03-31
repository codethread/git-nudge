import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card"
import {Lead, Text} from "@/components/ui/text"
import {useFetcher} from "@/hooks/fetcher/useFetcher"
import {useUsersQuery, type IUser} from "@/hooks/users/useUsers"
import {gt, sub, min} from "@/lib/maths"
import {MyBioQuery} from "@/page/welcome/welcome.gql"
import {User} from "@/page/widgets/Users"
import {Progress} from "@radix-ui/react-progress"
import {useQuery} from "@tanstack/react-query"
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

export function UsersCard({onSuccess}: ReadyProps) {
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
