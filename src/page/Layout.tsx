import {AppSidebar, type SidebarProps} from "@/components/app-sidebar"
import {SidebarProvider} from "@/components/ui/sidebar"

export default function Layout({
	children,
	actions,
}: {
	actions: SidebarProps["actions"]
	children: React.ReactNode
}) {
	return (
		<SidebarProvider>
			<AppSidebar actions={actions} />
			{/* pr-2 to match sidebar */}
			<main className="mx-auto w-full max-w-6xl pr-2">{children}</main>
		</SidebarProvider>
	)
}
