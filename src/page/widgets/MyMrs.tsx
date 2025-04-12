import {GetMyMrs} from "./mrs.gql"
import {ErrorComp} from "@/components/ErrorBoundary"
import {Loader} from "@/components/ui/Loader"
import {Button} from "@/components/ui/button"
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"
import {Lead} from "@/components/ui/text"
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
		<div className="@container w-[100%] flex-1">
			<div className="gap-sm @min-5xl:gap-lg flex flex-wrap items-stretch justify-center">
				<Card className="max-w-[350px] flex-1 basis-[280px]">
					<CardHeader>
						<div className="flex justify-between">
							<CardTitle>
								<Lead>total {mrs?.length}</Lead>
								<p className="text-muted-foreground text-xs">
									Last fetch: {format(dataUpdatedAt, "eee hh:mm:ss")}
								</p>
								<p className="text-muted-foreground text-xs">
									<NextFetch dataUpdatedAt={dataUpdatedAt} />
								</p>
							</CardTitle>
							<Button
								variant={"outline"}
								size="iconSm"
								onClick={() => refetch()}
							>
								<RefreshCw className={isFetching ? "animate-spin" : ""} />
							</Button>
						</div>
					</CardHeader>
					<CardContent>
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
						<Separator />
						<ul>
							{mrs?.map((mr) => (
								<li key={mr?.id}>
									<div>
										<p className="truncate">
											{mr?.webUrl && (
												<a href={mr?.webUrl} target="_blank" rel="noreferrer">
													{mr?.title}
												</a>
											)}
											{/* {mr?.mergeable ? ( */}
											{/* 	<span> */}
											{/* 		<Check color="green" /> mergeable */}
											{/* 	</span> */}
											{/* ) : null} */}
										</p>
										{/* {mr?.mergeable ? null : ( */}
										{/* 	<ul> */}
										{/* 		{mr?.conflicts ? <li>❌ conflicts</li> : null} */}
										{/* 		{mr?.headPipeline?.status ? ( */}
										{/* 			<li>Pipeline: {mr.headPipeline.status}</li> */}
										{/* 		) : null} */}
										{/* 		{mr?.approved ? <li>√ approved</li> : null} */}
										{/* 		{mr?.approvalState.invalidApproversRules */}
										{/* 			?.filter((r) => !r.allowMergeWhenInvalid) */}
										{/* 			.map((r) => r.name) */}
										{/* 			.join(" ") ?? null} */}
										{/* 	</ul> */}
										{/* )} */}
									</div>
								</li>
							))}
						</ul>
					</CardContent>
				</Card>
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

	return (
		<span>
			Next fetch:{" "}
			{rtf1.format(
				Math.floor((dataUpdatedAt + duration(amount, unit) - now) / 1000),
				"second",
			)}
		</span>
	)
}
