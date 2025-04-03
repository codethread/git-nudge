import {GetMyMrs} from "./mrs.gql"
import {ErrorComp} from "@/components/ErrorBoundary"
import {Loader} from "@/components/ui/Loader"
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"
import {Lead} from "@/components/ui/text"
import {useConfigSelector} from "@/hooks/config/useConfig"
import {useFetcher} from "@/hooks/fetcher/useFetcher"
import {uniqueBy} from "@/lib/utils"
import {useQuery} from "@tanstack/react-query"
import {Check} from "lucide-react"

export function MyMrs() {
	const fetcher = useFetcher()
	const {domain, user} = useConfigSelector((s) => s.gitlab)
	const {isSuccess, isFetching, error, data, refetch} = useQuery({
		queryKey: ["myMrs"],
		refetchInterval: 60 * 1000,
		queryFn: () => fetcher(GetMyMrs, {draft: true}),
	})

	if (error) return <ErrorComp error={error} />
	if (isSuccess && !data.currentUser) return <ErrorComp error="missing user" />
	if (!isSuccess) return <Loader />

	const {assignedMergeRequests, authoredMergeRequests} = data.currentUser!
	const mrs = authoredMergeRequests?.nodes
		?.concat(assignedMergeRequests?.nodes)
		.filter(Boolean)
		.filter(uniqueBy("id"))

	return (
		<div className="@container w-[100%] flex-1">
			<div className="gap-sm @min-5xl:gap-lg flex flex-wrap items-stretch justify-center">
				<Card className="max-w-[350px] flex-1 basis-[280px]">
					<CardHeader>
						<CardTitle>
							<Lead>total {mrs?.length}</Lead>
						</CardTitle>
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
										<p>
											{mr?.webUrl && (
												<a href={mr?.webUrl} target="_blank" rel="noreferrer">
													{mr?.title}
												</a>
											)}
											{mr?.mergeable ? (
												<span>
													<Check color="green" /> mergeable
												</span>
											) : null}
										</p>
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
