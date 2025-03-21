import {graphql} from "../graphql";
import type {GetMyMrsQuery, PipelineStatusEnum} from "../graphql/graphql";
import {useBridge} from "../hooks/useBridge";
import {useConfigMe, useConfigRequest} from "../hooks/useConfig";
import {execute} from "../utils/execute";
import {Users} from "./widgets/Users";
import {Button} from "@/components/ui/button";
import {useQuery} from "@tanstack/react-query";
import equal from "fast-deep-equal";
import {useEffect, useState} from "react";

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
	const reqConf = useConfigRequest();
	const me = useConfigMe();
	const {notify} = useBridge();

	const {isPending, isFetching, error, data, refetch} = useQuery({
		queryKey: ["me"],
		refetchInterval: 60 * 1000,
		queryFn: () => execute(reqConf, GetMyMrs, {draft: true}),
	});

	const [previousData, setPreviousData] = useState<NotificationData>();

	useEffect(() => {
		if (previousData?.shouldNotify) {
			setPreviousData({...previousData, shouldNotify: false});
			notify("something changed!");
		}
	}, [previousData, notify]);

	if (isPending) {
		return <div>...loading</div>;
	}

	if (error) {
		return (
			<div>
				<p>{error.message}</p>
				<Button
					onClick={() => {
						refetch();
					}}
				>
					retry
				</Button>
			</div>
		);
	}

	if (!data.currentUser?.authoredMergeRequests) {
		return (
			<div>
				Your token did not seem to return a valid user, please check it hasn't
				expired
				<Button
					onClick={() => {
						refetch();
					}}
				>
					retry
				</Button>
			</div>
		);
	}

	const diff = getNotifictionData(data.currentUser.authoredMergeRequests);
	if (!equal(diff, previousData?.mrs)) {
		setPreviousData({shouldNotify: !!previousData, mrs: diff});
	}

	return (
		<div>
			<h2 className="text-xl bg-background">
				hello {data.currentUser.name}
				{isFetching && <span>...fetching</span>}
			</h2>
			<div>
				<Button
					onClick={() => {
						notify("hello");
					}}
				>
					Test notification
				</Button>
				<Button onClick={() => refetch()}>Test fetch</Button>
			</div>
			<p>
				you have{" "}
				<a
					target="_blank"
					href={`https://${reqConf.domain}/dashboard/merge_requests?assignee_username=${me.username}`}
					rel="noreferrer"
				>
					{data.currentUser?.authoredMergeRequests?.count} open MRs
				</a>
			</p>
			<ul style={{display: "flex", flexDirection: "column", gap: "8px"}}>
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
								{mr?.webUrl && (
									<a href={mr?.webUrl} target="_blank" rel="noreferrer">
										{mr?.title}
									</a>
								)}
								{mr?.mergeable ? <span> √ mergeable</span> : null}
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
			<Users />
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
		if (!mr) continue;
		ls.set(mr.id, {
			approved: !!mr.approved,
			pipeline: mr.headPipeline?.status || "PENDING",
			comments:
				mr.notes.nodes?.filter((n) => !n?.authorIsContributor).length ?? 0,
			conflicts: !!mr.conflicts,
		});
	}
	return ls;
}
