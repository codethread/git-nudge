import {GetMyMrs, type MyCurrentUser, type MyMr} from "./mrs.gql"
import {ErrorComp} from "@/components/ErrorBoundary"
import {Loader} from "@/components/ui/Loader"
import {Button} from "@/components/ui/button"
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
	CardDescription,
} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"
import {Lead} from "@/components/ui/text"
import {useConfigSelector} from "@/hooks/config/useConfig"
import {useFetcher} from "@/hooks/fetcher/useFetcher"
import {duration} from "@/lib/duration"
import {add} from "@/lib/maths"
import {uniqueBy} from "@/lib/utils"
import {useQuery} from "@tanstack/react-query"
import {format, formatRelative} from "date-fns"
import {Check, RefreshCw} from "lucide-react"
import {useEffect, useState} from "react"

const rtf1 = new Intl.RelativeTimeFormat("en", {style: "short"})

export function MyMrs() {
	const fetcher = useFetcher()
	const {unit, amount} = useConfigSelector((s) => s.myMRsRefreshRate)
	const {isSuccess, isFetching, error, data, refetch, dataUpdatedAt} = useQuery(
		{
			queryKey: ["myMrs"],
			refetchInterval: duration(amount, unit),
			queryFn: () => fetcher(GetMyMrs, {draft: true}),
		},
	)

	if (error) return <ErrorComp error={error} />
	if (!isSuccess) return <Loader variant={"page"} />
	if (!data.currentUser) return <ErrorComp error="missing user" />

	const {assignedMergeRequests, authoredMergeRequests} = data.currentUser
	const mrs = authoredMergeRequests?.nodes
		?.concat(assignedMergeRequests?.nodes)
		.filter(Boolean)
		.filter(uniqueBy("id"))

	return (
		<div className="@container">
			<div className="gap-sm @min-5xl:gap-lg flex flex-col items-stretch justify-center">
				<Summary
					currentUser={data.currentUser}
					refetch={refetch}
					isFetching={isFetching}
					dataUpdatedAt={dataUpdatedAt}
				/>
				<ul className="gap-sm flex flex-col">
					{mrs?.filter(Boolean).map((mr) => (
						<li key={mr?.id}>
							<Mr mr={mr} />
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

interface ISummary {
	currentUser: MyCurrentUser
	isFetching: boolean
	dataUpdatedAt: number
	refetch: IAction
}

function Summary({currentUser, refetch, dataUpdatedAt, isFetching}: ISummary) {
	const {domain, user} = useConfigSelector((s) => s.gitlab)
	const {authoredMergeRequests, assignedMergeRequests} = currentUser
	return (
		<div>
			<div className="flex justify-between">
				<div>
					<Lead>
						Open Merge Requests:{" "}
						{add(assignedMergeRequests?.count, authoredMergeRequests?.count)}
					</Lead>
					<p className="text-muted-foreground">
						<a
							target="_blank"
							href={`https://${domain}/dashboard/merge_requests?assignee_username=${user}`}
							rel="noreferrer"
						>
							assigned: {assignedMergeRequests?.count}
						</a>
						{" | "}
						<a
							target="_blank"
							href={`https://${domain}/dashboard/merge_requests?author_username=${user}`}
							rel="noreferrer"
						>
							authored: {authoredMergeRequests?.count}
						</a>
					</p>
				</div>

				<div className="gap-sm flex">
					<div className="text-end">
						<p className="text-muted-foreground text-xs">
							Last fetch: {format(dataUpdatedAt, "eee hh:mm:ss")}
						</p>
						<p className="text-muted-foreground text-xs">
							Next fetch: <NextFetch dataUpdatedAt={dataUpdatedAt} />
						</p>
					</div>
					<Button variant={"outline"} size="iconSm" onClick={refetch}>
						<RefreshCw className={isFetching ? "animate-spin" : ""} />
					</Button>
				</div>
			</div>
		</div>
	)
}

function NextFetch({dataUpdatedAt}: {dataUpdatedAt: number}) {
	const {unit, amount} = useConfigSelector((s) => s.myMRsRefreshRate)
	const [now, setNow] = useState(Date.now())

	useEffect(() => {
		const i = setInterval(
			() => {
				setNow(Date.now())
			},
			duration(1, "secs"),
		)
		return () => clearInterval(i)
	}, [])

	const secondsToUpdate = Math.floor(
		(dataUpdatedAt + duration(amount, unit) - now) / 1000,
	)

	if (secondsToUpdate <= 0 || secondsToUpdate >= duration(amount, unit))
		return null

	return (
		<span className="tabular-nums">
			{rtf1.format(secondsToUpdate, "second")}
		</span>
	)
}

function Mr({mr}: {mr: MyMr}) {
	return (
		<Card>
			<div className="flex">
				<div className="flex-1">
					<CardHeader>
						<CardTitle className="overflow-auto">
							<p className="truncate">
								{mr.webUrl && (
									<a href={mr.webUrl} target="_blank" rel="noreferrer">
										{mr.title}
									</a>
								)}
								{mr.mergeable ? (
									<Check className="mx-sm inline-flex" color="green" />
								) : null}
							</p>
						</CardTitle>
						<CardDescription className="overflow-auto">
							<p className="truncate">{mr.description}</p>
						</CardDescription>
					</CardHeader>
					<CardContent>
						{mr.approvalState.invalidApproversRules
							?.filter((r) => !r.allowMergeWhenInvalid)
							.map((r) => r.name)
							.join(" ") ?? null}
					</CardContent>
					<CardFooter>
						{mr.mergeable ? null : (
							<ul className="flex">
								{mr.headPipeline?.status ? (
									<li>
										<p>Pipeline: {mr.headPipeline.status}</p>
									</li>
								) : null}
								{mr.approved ? (
									<li>
										<p>√ approved</p>
									</li>
								) : null}
							</ul>
						)}
					</CardFooter>
				</div>
				<div>
					<Separator orientation="vertical" />
				</div>
				<div className="mx-md flex-1 overflow-auto">
					{mr.notes.nodes?.filter(Boolean).map((node) => (
						<p key={node.id} className="truncate text-sm">
							<span className="text-muted-foreground text-xs">
								{format(node.createdAt, "dd/MM/yy hh:mm")}
							</span>{" "}
							{node.author?.name} | {node.body}
						</p>
					))}
				</div>
			</div>
		</Card>
	)
}
