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
} from '@/components/ui/sidebar';
import {useIsFetching} from '@tanstack/react-query';
import {Home, Settings} from 'lucide-react';
import {Button} from './ui/button';
import {Lead} from './ui/text';

const items = [
	{
		title: 'Home',
		url: '#',
		icon: Home,
	},
	{
		title: 'Settings',
		url: '#',
		icon: Settings,
	},
];

export function AppSidebar({actions}: {actions: any}) {
	const fetchCount = useIsFetching();

	return (
		<Sidebar variant="floating">
			<SidebarHeader>
				<Lead>Git Nudge</Lead>
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
				{fetchCount}
				<Button
					variant="destructive"
					onClick={() => {
						actions.clearCache();
					}}
				>
					Clear cache
				</Button>
			</SidebarFooter>
		</Sidebar>
	);
}
