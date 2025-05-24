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
	useAppConfigShallowSelector,
	useIsDev,
} from "@/hooks/config/useAppConfig"
import {pick} from "@/lib/utils"
import {useNavigate} from "@tanstack/react-router"
import {Hand, Home, Settings, Trash2, Users} from "lucide-react"

export function AppSidebar() {
	const isDev = useIsDev()
	const navigate = useNavigate()
	const isFake = useAppConfigSelector((s) => s.fakeLab)
	const viewer = useAppConfigShallowSelector((s) =>
		s.gitlab.state === "ready" ? pick(s.gitlab, ["user", "domain"]) : undefined,
	)
	const {clearClientCache, toggleFakeLab} = useAppConfigAction()

	const items = [
		{
			enabled: true,
			title: "Home",
			action: () => navigate({to: "/"}),
			icon: Home,
		},
		{
			enabled: true,
			title: "Users",
			action: () => navigate({to: "/users"}),
			icon: Users,
		},
		{
			enabled: true,
			title: "Settings",
			action: () => navigate({to: "/welcome"}),
			icon: Settings,
		},
		{
			enabled: isDev,
			title: "Welcome",
			action: () => navigate({to: "/welcome"}),
			icon: Hand,
		},
	]

	const actions = [
		{
			enabled: true,
			title: "Clear Cache",
			action: clearClientCache,
			icon: Trash2,
		},
		{
			enabled: true,
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
							{items
								.filter((i) => i.enabled)
								.map((item) => (
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
			</SidebarContent>

			<SidebarFooter>
				<SidebarGroupLabel>Debug</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						{actions
							.filter((i) => i.enabled)
							.map((item) => (
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

						{/* {isFake ? ( */}
						{/* 	<FakeSettings> */}
						{/* 		<SidebarMenuItem> */}
						{/* 			<SidebarMenuButton asChild className="cursor-pointer"> */}
						{/* 				<div> */}
						{/* 					<Settings2 /> */}
						{/* 					<span>Fake settings</span> */}
						{/* 				</div> */}
						{/* 			</SidebarMenuButton> */}
						{/* 		</SidebarMenuItem> */}
						{/* 	</FakeSettings> */}
						{/* ) : null} */}
					</SidebarMenu>
				</SidebarGroupContent>
				<SidebarTrigger />
			</SidebarFooter>
		</Sidebar>
	)
}
