import {AppSidebar, } from "@/components/app-sidebar"
import {SidebarProvider} from "@/components/ui/sidebar"

export default function Layout({children}: {children: React.ReactNode}) {
	return (
		<SidebarProvider>
			<AppSidebar />
			{/* pr-2 to match sidebar */}
			<main className="mx-auto w-full max-w-6xl pr-2">{children}</main>
		</SidebarProvider>
	)
}
