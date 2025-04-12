import {GetMyMrs} from "./mrs.gql"
import {ErrorComp} from "@/components/ErrorBoundary"
import {Loader} from "@/components/ui/Loader"
import {Button} from "@/components/ui/button"
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"
import {Lead} from "@/components/ui/text"
import type {MrFragmentFragment} from "@/graphql/graphql"
import {useConfigSelector} from "@/hooks/config/useConfig"
import {useFetcher} from "@/hooks/fetcher/useFetcher"
import {duration} from "@/lib/duration"
import {uniqueBy} from "@/lib/utils"
import {useQuery} from "@tanstack/react-query"
import {format} from "date-fns"
import {Check, RefreshCw} from "lucide-react"
import {useEffect, useState} from "react"

const rtf1 = new Intl.RelativeTimeFormat("en", {style: "short"})

export function MyMrs() {
	const fetcher = useFetcher()
	const {domain, user} = useConfigSelector((s) => s.gitlab)
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
				<Lead>total {mrs?.length}</Lead>
				<Button variant={"outline"} size="iconSm" onClick={() => refetch()}>
					<RefreshCw className={isFetching ? "animate-spin" : ""} />
				</Button>
				<p className="text-muted-foreground text-xs">
					Last fetch: {format(dataUpdatedAt, "eee hh:mm:ss")}
				</p>
				<p className="text-muted-foreground text-xs">
					Next fetch: <NextFetch dataUpdatedAt={dataUpdatedAt} />
				</p>
				<p>
					you have{" "}
					<a
						target="_blank"
						href={`https://${domain}/dashboard/merge_requests?assignee_username=${user}`}
						rel="noreferrer"
					>
						{assignedMergeRequests?.count} open MRs
					</a>
				</p>
				<ul>
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

function Mr({mr}: {mr: MrFragmentFragment}) {
	return (
		<Card className="flex-1">
			<CardHeader>
				<CardTitle>
					<p className="truncate">
						{mr?.webUrl && (
							<a href={mr?.webUrl} target="_blank" rel="noreferrer">
								{mr?.title}
							</a>
						)}
						{mr?.mergeable ? (
							<span>
								<Check className="inline-flex" color="green" /> mergeable
							</span>
						) : null}
					</p>
				</CardTitle>
			</CardHeader>
			<CardContent>
				{mr?.mergeable ? null : (
					<ul>
						{mr?.conflicts ? <li>❌ conflicts</li> : null}
						{mr?.headPipeline?.status ? (
							<li>Pipeline: {mr.headPipeline.status}</li>
						) : null}
						{mr?.approved ? <li>√ approved</li> : null}
						{mr?.approvalState.invalidApproversRules
							?.filter((r) => !r.allowMergeWhenInvalid)
							.map((r) => r.name)
							.join(" ") ?? null}
					</ul>
				)}
			</CardContent>
		</Card>
	)
}
