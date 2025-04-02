import {AppSidebar} from "@/components/AppSidebar"
import {FakeSettings} from "@/components/FakeOptions"
import {SidebarProvider} from "@/components/ui/sidebar"

export default function Layout({children}: {children: React.ReactNode}) {
	return (
		<SidebarProvider>
			<AppSidebar />
			{/* pr-2 to match sidebar */}
			<main className="mx-auto w-full max-w-6xl pt-2 pr-2">{children}</main>
		</SidebarProvider>
	)
}
