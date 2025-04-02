import type {Resolvers, Scalars} from "@/graphql/server"

export const scalars: Scalars = {
	ID: {
		input: "",
		output: "",
	},
	String: {
		input: () => {
			console.log("codethread", "hit")
			throw new Error("ah")
		},
		output: () => {
			console.log("codethread", "hitout")
			throw new Error("ah")
		},
	},
	Boolean: {
		input: false,
		output: false,
	},
	Int: {
		input: 0,
		output: 0,
	},
	Float: {
		input: 0,
		output: 0,
	},
	AbuseReportID: {
		input: undefined,
		output: undefined,
	},
	AchievementsAchievementID: {
		input: undefined,
		output: undefined,
	},
	AchievementsUserAchievementID: {
		input: undefined,
		output: undefined,
	},
	AiAgentID: {
		input: undefined,
		output: undefined,
	},
	AiAgentVersionID: {
		input: undefined,
		output: undefined,
	},
	AiConversationThreadID: {
		input: undefined,
		output: undefined,
	},
	AiDuoWorkflowsWorkflowID: {
		input: undefined,
		output: undefined,
	},
	AiModelID: {
		input: undefined,
		output: undefined,
	},
	AiSelfHostedModelID: {
		input: undefined,
		output: undefined,
	},
	AlertManagementAlertID: {
		input: undefined,
		output: undefined,
	},
	AlertManagementHttpIntegrationID: {
		input: undefined,
		output: undefined,
	},
	AnalyticsCycleAnalyticsStageID: {
		input: undefined,
		output: undefined,
	},
	AnalyticsCycleAnalyticsValueStreamID: {
		input: undefined,
		output: undefined,
	},
	AnalyticsDevopsAdoptionEnabledNamespaceID: {
		input: undefined,
		output: undefined,
	},
	AntiAbuseReportsLabelID: {
		input: undefined,
		output: undefined,
	},
	AntiAbuseReportsNoteID: {
		input: undefined,
		output: undefined,
	},
	AppSecFuzzingCoverageCorpusID: {
		input: undefined,
		output: undefined,
	},
	ApprovalProjectRuleID: {
		input: undefined,
		output: undefined,
	},
	AuditEventsAmazonS3ConfigurationID: {
		input: undefined,
		output: undefined,
	},
	AuditEventsExternalAuditEventDestinationID: {
		input: undefined,
		output: undefined,
	},
	AuditEventsGoogleCloudLoggingConfigurationID: {
		input: undefined,
		output: undefined,
	},
	AuditEventsGroupExternalStreamingDestinationID: {
		input: undefined,
		output: undefined,
	},
	AuditEventsGroupNamespaceFilterID: {
		input: undefined,
		output: undefined,
	},
	AuditEventsInstanceAmazonS3ConfigurationID: {
		input: undefined,
		output: undefined,
	},
	AuditEventsInstanceExternalAuditEventDestinationID: {
		input: undefined,
		output: undefined,
	},
	AuditEventsInstanceExternalStreamingDestinationID: {
		input: undefined,
		output: undefined,
	},
	AuditEventsInstanceGoogleCloudLoggingConfigurationID: {
		input: undefined,
		output: undefined,
	},
	AuditEventsInstanceNamespaceFilterID: {
		input: undefined,
		output: undefined,
	},
	AuditEventsStreamingHTTPNamespaceFilterID: {
		input: undefined,
		output: undefined,
	},
	AuditEventsStreamingHeaderID: {
		input: undefined,
		output: undefined,
	},
	AuditEventsStreamingInstanceHeaderID: {
		input: undefined,
		output: undefined,
	},
	AwardableID: {
		input: undefined,
		output: undefined,
	},
	BigInt: {
		input: undefined,
		output: undefined,
	},
	BoardID: {
		input: undefined,
		output: undefined,
	},
	BoardsEpicBoardID: {
		input: undefined,
		output: undefined,
	},
	BoardsEpicListID: {
		input: undefined,
		output: undefined,
	},
	CiBuildID: {
		input: undefined,
		output: undefined,
	},
	CiCatalogResourceID: {
		input: undefined,
		output: undefined,
	},
	CiCatalogResourcesComponentID: {
		input: undefined,
		output: undefined,
	},
	CiCatalogResourcesVersionID: {
		input: undefined,
		output: undefined,
	},
	CiInputsValueInputType: {
		input: undefined,
		output: undefined,
	},
	CiJobArtifactID: {
		input: undefined,
		output: undefined,
	},
	CiPipelineID: {
		input: undefined,
		output: undefined,
	},
	CiPipelineScheduleID: {
		input: undefined,
		output: undefined,
	},
	CiPipelineScheduleInputID: {
		input: undefined,
		output: undefined,
	},
	CiPipelineScheduleVariableID: {
		input: undefined,
		output: undefined,
	},
	CiProcessableID: {
		input: undefined,
		output: undefined,
	},
	CiRunnerID: {
		input: undefined,
		output: undefined,
	},
	CiRunnerManagerID: {
		input: undefined,
		output: undefined,
	},
	CiStageID: {
		input: undefined,
		output: undefined,
	},
	CiSubscriptionsProjectID: {
		input: undefined,
		output: undefined,
	},
	CiTriggerID: {
		input: undefined,
		output: undefined,
	},
	ClustersAgentID: {
		input: undefined,
		output: undefined,
	},
	ClustersAgentTokenID: {
		input: undefined,
		output: undefined,
	},
	ClustersAgentsUrlConfigurationID: {
		input: undefined,
		output: undefined,
	},
	ClustersClusterID: {
		input: undefined,
		output: undefined,
	},
	Color: {
		input: undefined,
		output: undefined,
	},
	ComplianceManagementComplianceFrameworkComplianceRequirementID: {
		input: undefined,
		output: undefined,
	},
	ComplianceManagementComplianceFrameworkComplianceRequirementsControlID: {
		input: undefined,
		output: undefined,
	},
	ComplianceManagementFrameworkID: {
		input: undefined,
		output: undefined,
	},
	ContainerRegistryProtectionRuleID: {
		input: undefined,
		output: undefined,
	},
	ContainerRegistryProtectionTagRuleID: {
		input: undefined,
		output: undefined,
	},
	ContainerRepositoryID: {
		input: undefined,
		output: undefined,
	},
	CustomEmojiID: {
		input: undefined,
		output: undefined,
	},
	CustomerRelationsContactID: {
		input: undefined,
		output: undefined,
	},
	CustomerRelationsOrganizationID: {
		input: undefined,
		output: undefined,
	},
	DastProfileID: {
		input: undefined,
		output: undefined,
	},
	DastProfileScheduleID: {
		input: undefined,
		output: undefined,
	},
	DastScannerProfileID: {
		input: undefined,
		output: undefined,
	},
	DastSiteProfileID: {
		input: undefined,
		output: undefined,
	},
	DastSiteTokenID: {
		input: undefined,
		output: undefined,
	},
	DastSiteValidationID: {
		input: undefined,
		output: undefined,
	},
	Date: {
		input: undefined,
		output: undefined,
	},
	DependencyProxyManifestID: {
		input: undefined,
		output: undefined,
	},
	DeployKeyID: {
		input: undefined,
		output: undefined,
	},
	DeploymentID: {
		input: undefined,
		output: undefined,
	},
	DescriptionVersionID: {
		input: undefined,
		output: undefined,
	},
	DesignManagementDesignAtVersionID: {
		input: undefined,
		output: undefined,
	},
	DesignManagementDesignID: {
		input: undefined,
		output: undefined,
	},
	DesignManagementVersionID: {
		input: undefined,
		output: undefined,
	},
	DiffNoteID: {
		input: undefined,
		output: undefined,
	},
	DiscussionID: {
		input: undefined,
		output: undefined,
	},
	Duration: {
		input: undefined,
		output: undefined,
	},
	EmailID: {
		input: undefined,
		output: undefined,
	},
	EnvironmentID: {
		input: undefined,
		output: undefined,
	},
	EpicID: {
		input: undefined,
		output: undefined,
	},
	EpicTreeSortingID: {
		input: undefined,
		output: undefined,
	},
	GeoBaseRegistryID: {
		input: undefined,
		output: undefined,
	},
	GitlabErrorTrackingDetailedErrorID: {
		input: undefined,
		output: undefined,
	},
	GitlabSubscriptionsAddOnPurchaseID: {
		input: undefined,
		output: undefined,
	},
	GlobalID: {
		input: undefined,
		output: undefined,
	},
	GoogleCloudImage: {
		input: undefined,
		output: undefined,
	},
	GoogleCloudMachineType: {
		input: undefined,
		output: undefined,
	},
	GoogleCloudProject: {
		input: undefined,
		output: undefined,
	},
	GoogleCloudRegion: {
		input: undefined,
		output: undefined,
	},
	GoogleCloudZone: {
		input: undefined,
		output: undefined,
	},
	GroupID: {
		input: undefined,
		output: undefined,
	},
	GroupsSavedReplyID: {
		input: undefined,
		output: undefined,
	},
	ISO8601Date: {
		input: undefined,
		output: undefined,
	},
	ISO8601DateTime: {
		input: undefined,
		output: undefined,
	},
	ImportSourceUserID: {
		input: undefined,
		output: undefined,
	},
	IncidentManagementEscalationPolicyID: {
		input: undefined,
		output: undefined,
	},
	IncidentManagementEscalationRuleID: {
		input: undefined,
		output: undefined,
	},
	IncidentManagementIssuableResourceLinkID: {
		input: undefined,
		output: undefined,
	},
	IncidentManagementOncallParticipantID: {
		input: undefined,
		output: undefined,
	},
	IncidentManagementOncallRotationID: {
		input: undefined,
		output: undefined,
	},
	IncidentManagementTimelineEventID: {
		input: undefined,
		output: undefined,
	},
	IncidentManagementTimelineEventTagID: {
		input: undefined,
		output: undefined,
	},
	IntegrationsPrometheusID: {
		input: undefined,
		output: undefined,
	},
	IssuableID: {
		input: undefined,
		output: undefined,
	},
	IssuablesCustomFieldID: {
		input: undefined,
		output: undefined,
	},
	IssuablesCustomFieldSelectOptionID: {
		input: undefined,
		output: undefined,
	},
	IssueID: {
		input: undefined,
		output: undefined,
	},
	IssueParentID: {
		input: undefined,
		output: undefined,
	},
	IterationID: {
		input: undefined,
		output: undefined,
	},
	IterationsCadenceID: {
		input: undefined,
		output: undefined,
	},
	JSON: {
		input: undefined,
		output: undefined,
	},
	JobID: {
		input: undefined,
		output: undefined,
	},
	JsonString: {
		input: undefined,
		output: undefined,
	},
	LabelID: {
		input: undefined,
		output: undefined,
	},
	ListID: {
		input: undefined,
		output: undefined,
	},
	MemberRoleID: {
		input: undefined,
		output: undefined,
	},
	MergeRequestID: {
		input: undefined,
		output: undefined,
	},
	MergeRequestsClosingIssuesID: {
		input: undefined,
		output: undefined,
	},
	MergeRequestsExternalStatusCheckID: {
		input: undefined,
		output: undefined,
	},
	MergeTrainsCarID: {
		input: undefined,
		output: undefined,
	},
	MilestoneID: {
		input: undefined,
		output: undefined,
	},
	MlCandidateID: {
		input: undefined,
		output: undefined,
	},
	MlCandidateMetadataID: {
		input: undefined,
		output: undefined,
	},
	MlCandidateMetricID: {
		input: undefined,
		output: undefined,
	},
	MlCandidateParamID: {
		input: undefined,
		output: undefined,
	},
	MlExperimentID: {
		input: undefined,
		output: undefined,
	},
	MlModelID: {
		input: undefined,
		output: undefined,
	},
	MlModelVersionID: {
		input: undefined,
		output: undefined,
	},
	NamespaceID: {
		input: undefined,
		output: undefined,
	},
	NamespacesNamespaceBanID: {
		input: undefined,
		output: undefined,
	},
	NoteID: {
		input: undefined,
		output: undefined,
	},
	NoteableID: {
		input: undefined,
		output: undefined,
	},
	OperationsFeatureFlagID: {
		input: undefined,
		output: undefined,
	},
	OrganizationsOrganizationID: {
		input: undefined,
		output: undefined,
	},
	OrganizationsOrganizationUserID: {
		input: undefined,
		output: undefined,
	},
	PackagesConanFileMetadatumID: {
		input: undefined,
		output: undefined,
	},
	PackagesConanMetadatumID: {
		input: undefined,
		output: undefined,
	},
	PackagesDependencyID: {
		input: undefined,
		output: undefined,
	},
	PackagesDependencyLinkID: {
		input: undefined,
		output: undefined,
	},
	PackagesMavenMetadatumID: {
		input: undefined,
		output: undefined,
	},
	PackagesNugetDependencyLinkMetadatumID: {
		input: undefined,
		output: undefined,
	},
	PackagesNugetMetadatumID: {
		input: undefined,
		output: undefined,
	},
	PackagesPackageFileID: {
		input: undefined,
		output: undefined,
	},
	PackagesPackageID: {
		input: undefined,
		output: undefined,
	},
	PackagesProtectionRuleID: {
		input: undefined,
		output: undefined,
	},
	PackagesPypiMetadatumID: {
		input: undefined,
		output: undefined,
	},
	PackagesTerraformModuleMetadatumID: {
		input: undefined,
		output: undefined,
	},
	PagesDeploymentID: {
		input: undefined,
		output: undefined,
	},
	PathLockID: {
		input: undefined,
		output: undefined,
	},
	PayloadAlertFieldPathSegment: {
		input: undefined,
		output: undefined,
	},
	ProjectID: {
		input: undefined,
		output: undefined,
	},
	ProjectImportStateID: {
		input: undefined,
		output: undefined,
	},
	ProjectsBranchRuleID: {
		input: undefined,
		output: undefined,
	},
	ProjectsSavedReplyID: {
		input: undefined,
		output: undefined,
	},
	ProjectsTargetBranchRuleID: {
		input: undefined,
		output: undefined,
	},
	ReleaseID: {
		input: undefined,
		output: undefined,
	},
	ReleasesLinkID: {
		input: undefined,
		output: undefined,
	},
	RemoteDevelopmentWorkspaceID: {
		input: undefined,
		output: undefined,
	},
	RemoteDevelopmentWorkspaceVariableID: {
		input: undefined,
		output: undefined,
	},
	RemoteDevelopmentWorkspacesAgentConfigID: {
		input: undefined,
		output: undefined,
	},
	SbomComponentID: {
		input: undefined,
		output: undefined,
	},
	SbomComponentVersionID: {
		input: undefined,
		output: undefined,
	},
	SbomOccurrenceID: {
		input: undefined,
		output: undefined,
	},
	SecurityProjectSecurityExclusionID: {
		input: undefined,
		output: undefined,
	},
	SecurityTrainingProviderID: {
		input: undefined,
		output: undefined,
	},
	SnippetID: {
		input: undefined,
		output: undefined,
	},
	SystemNoteMetadataID: {
		input: undefined,
		output: undefined,
	},
	TerraformStateID: {
		input: undefined,
		output: undefined,
	},
	Time: {
		input: undefined,
		output: undefined,
	},
	TimelogID: {
		input: undefined,
		output: undefined,
	},
	TodoID: {
		input: undefined,
		output: undefined,
	},
	TodoableID: {
		input: undefined,
		output: undefined,
	},
	UntrustedRegexp: {
		input: undefined,
		output: undefined,
	},
	Upload: {
		input: undefined,
		output: undefined,
	},
	UploadID: {
		input: undefined,
		output: undefined,
	},
	UserID: {
		input: undefined,
		output: undefined,
	},
	UsersSavedReplyID: {
		input: undefined,
		output: undefined,
	},
	VulnerabilitiesExternalIssueLinkID: {
		input: undefined,
		output: undefined,
	},
	VulnerabilitiesScannerID: {
		input: undefined,
		output: undefined,
	},
	VulnerabilitiesStateTransitionID: {
		input: undefined,
		output: undefined,
	},
	VulnerabilityID: {
		input: undefined,
		output: undefined,
	},
	WikiPageMetaID: {
		input: undefined,
		output: undefined,
	},
	WorkItemID: {
		input: undefined,
		output: undefined,
	},
	WorkItemsParentID: {
		input: undefined,
		output: undefined,
	},
	WorkItemsRelatedWorkItemLinkID: {
		input: undefined,
		output: undefined,
	},
	WorkItemsTypeID: {
		input: undefined,
		output: undefined,
	},
}
