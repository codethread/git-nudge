import { graphql } from "../graphql";
import { GetMyMrsQuery, PipelineStatusEnum } from "../graphql/graphql";
import { useBridge } from "../hooks/useBridge";
import { useConfig } from "../hooks/useConfig";
import { execute } from "../utils/execute";
import { useQuery } from "@tanstack/react-query";
import equal from "fast-deep-equal";
import { useEffect, useState } from "react";

const GetMyMrs = graphql(`
	query GetMyMrs($draft: Boolean!) {
		currentUser {
			name
			authoredMergeRequests(draft: $draft, state: opened) {
				count
				nodes {
					id
					title
					webUrl
					createdAt
					draft
					mergeable
					conflicts
					userDiscussionsCount
					userNotesCount
					notes(filter: ONLY_COMMENTS) {
						nodes {
							id
							authorIsContributor
							resolved
						}
					}
					headPipeline {
						id
						active
						path
						status
					}
					approvalState {
						invalidApproversRules {
							allowMergeWhenInvalid
							id
							invalid
							name
						}
					}
					approved
					approvedBy {
						nodes {
							name
							avatarUrl
						}
					}
				}
			}
		}
	}
`);

type NotificationData = {
	shouldNotify: boolean;
	mrs: Map<
		string,
		{
			pipeline: PipelineStatusEnum;
			approved: boolean;
			conflicts: boolean;
			comments: number;
		}
	>;
};
type NotificationDataMrs = NotificationData["mrs"];

export function Dashboard() {
	const config = useConfig();
	const { notify } = useBridge();

	const { isPending, isFetching, error, data, refetch } = useQuery({
		queryKey: ["me"],
		refetchInterval: 60 * 1000,
		queryFn: () => execute(config, GetMyMrs, { draft: true }),
	});

	const [previousData, setPreviousData] = useState<NotificationData>();

	useEffect(() => {
		if (previousData && previousData.shouldNotify) {
			setPreviousData({ ...previousData, shouldNotify: false });
			notify("something changed!");
		}
	}, [previousData?.shouldNotify]);

	if (isPending) {
		return <div>...loading</div>;
	}

	if (error) {
		return (
			<div>
				<p>{error.message}</p>
				<button onClick={() => refetch()}>retry</button>
			</div>
		);
	}

	if (!data.currentUser?.authoredMergeRequests) {
		return (
			<div>
				Your token did not seem to return a valid user, please check it hasn't
				expired
				<button onClick={() => refetch()}>retry</button>
			</div>
		);
	}

	const diff = getNotifictionData(data.currentUser.authoredMergeRequests);
	if (!equal(diff, previousData?.mrs)) {
		setPreviousData({ shouldNotify: !!previousData, mrs: diff });
	}

	return (
		<div>
			<p>
				hello {data.currentUser.name}
				{isFetching && <span>...fetching</span>}
			</p>
			<div>
				<button
					onClick={() => {
						notify("hello");
					}}
				>
					Test notification
				</button>
				<button onClick={() => refetch()}>Test fetch</button>
			</div>
			<p>
				you have{" "}
				<a
					target="_blank"
					href={`https://${config.gitlab.domain}/dashboard/merge_requests?assignee_username=${config.gitlab.user}`}
				>
					{data.currentUser?.authoredMergeRequests?.count} open MRs
				</a>
			</p>
			<ul style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
				{data.currentUser.authoredMergeRequests?.nodes?.map((mr) => (
					<li key={mr?.id}>
						<div
							style={{
								border: "solid thin coral",
								borderRadius: "8px",
								padding: "8px",
							}}
						>
							<p>
								<a href={mr?.webUrl!} target="_blank">
									{mr?.title}
								</a>
								{mr?.mergeable ? <span> ✔ mergeable</span> : null}
							</p>
							{mr?.mergeable ? null : (
								<ul>
									{mr?.conflicts ? <li>❌ conflicts</li> : null}
									{mr?.headPipeline?.status ? (
										<li>Pipeline: {mr.headPipeline.status}</li>
									) : null}
									{mr?.approved ? <li>✔ approved</li> : null}
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
		</div>
	);
}

function getNotifictionData(
	mrs: NonNullable<GetMyMrsQuery["currentUser"]>["authoredMergeRequests"],
): NotificationDataMrs {
	console.debug(mrs);
	const ls: NotificationDataMrs = new Map();
	if (!mrs?.nodes) return new Map();
	for (const mr of mrs.nodes) {
		ls.set(mr?.id!, {
			approved: !!mr?.approved,
			pipeline: mr?.headPipeline?.status!,
			comments:
				mr?.notes.nodes?.filter((n) => !n?.authorIsContributor).length ?? 0,
			conflicts: !!mr?.conflicts,
		});
	}
	return ls;
}
