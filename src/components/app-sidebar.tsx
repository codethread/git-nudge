import {Button} from "./ui/button"
import {Lead} from "./ui/text"
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
import {useIsFetching} from "@tanstack/react-query"
import {Gitlab, Home, Settings} from "lucide-react"

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

export function AppSidebar({actions}: {actions: any}) {
	const fetchCount = useIsFetching()

	return (
		<Sidebar variant="floating" collapsible="icon">
			<SidebarHeader>
				<div className="flex justify-between">
					<Lead className="group-data-[collapsible=icon]:hidden">
						Git Nudge
					</Lead>
					<Gitlab />
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
				<div className="gap-sm flex w-full items-end">
					{/* {fetchCount} */}
					<Button
						className="flex-1 group-data-[collapsible=icon]:hidden"
						variant="destructive"
						onClick={() => {
							actions.clearCache()
						}}
					>
						Clear cache
					</Button>
					<Button
						className="flex-1 group-data-[collapsible=icon]:hidden"
						variant="ghost"
						onClick={() => {
							actions.toggleFetcher()
						}}
					>
						Toggle Fetcher
					</Button>
					<SidebarTrigger />
				</div>
			</SidebarFooter>
		</Sidebar>
	)
}
