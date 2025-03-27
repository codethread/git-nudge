import {Lead} from "./ui/text"
import {Gitlab} from "@/components/icons/Gitlab"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarTrigger,
} from "@/components/ui/sidebar"
import {
	useAppConfigAction,
	useAppConfigSelector,
} from "@/hooks/config/useConfig"
import {useTheme} from "@/hooks/theme/useTheme"
import {pick} from "@/lib/utils"
import {Delete, Home, Settings, Trash, Trash2} from "lucide-react"

const items = [
	{
		title: "Home",
		url: "#",
		icon: Home,
	},
	{
		title: "Settings",
		url: "#",
		icon: Settings,
	},
]

export function AppSidebar() {
	const isFake = useAppConfigSelector((s) => s.fakeLab)
	const viewer = useAppConfigSelector((s) =>
		s.gitlab.state === "ready" ? pick(s.gitlab, ["user", "domain"]) : undefined,
	)
	const {clearClientCache, toggleFakeLab} = useAppConfigAction()

	const actions = [
		{
			title: "Clear Cache",
			action: clearClientCache,
			icon: Trash2,
		},
		{
			title: isFake ? "Use GitLab" : "Use FakeLab",
			action: toggleFakeLab,
			icon: () => (
				<Gitlab stroke="" color={isFake ? "#e24329" : "var(--foreground)"} />
			),
		},
	]

	return (
		<Sidebar variant="floating" collapsible="icon">
			<SidebarHeader>
				<div className="flex justify-between">
					<Lead className="group-data-[collapsible=icon]:hidden">
						Git Nudge
					</Lead>
				</div>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<SidebarGroup>
					<SidebarGroupLabel>Actions</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{actions.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										asChild
										className="cursor-pointer"
										onClick={item.action}
									>
										<div>
											<item.icon />
											<span>{item.title}</span>
										</div>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarTrigger />
				{/* <div className="gap-sm flex w-full items-end"> */}
				{/* </div> */}
			</SidebarFooter>
		</Sidebar>
	)
}
