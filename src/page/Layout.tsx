import {AppSidebar} from "@/components/app-sidebar";
import {SidebarProvider} from "@/components/ui/sidebar";

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
			<main className="w-full max-w-6xl mx-auto">{children}</main>
		</SidebarProvider>
	);
}
