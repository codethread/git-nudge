import {AppSidebar} from '@/components/app-sidebar';
import {SidebarProvider, SidebarTrigger} from '@/components/ui/sidebar';

export default function Layout({
	children,
	actions,
}: {
	actions: any;
	children: React.ReactNode;
}) {
	return (
		<SidebarProvider>
			<AppSidebar actions={actions} />
			<main>
				<SidebarTrigger />
				{children}
			</main>
		</SidebarProvider>
	);
}
