import {AppSidebar} from "@/components/AppSidebar"
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import {useNavigation} from "@/hooks/useNav"

export default function Layout({children}: {children: React.ReactNode}) {
	return (
		<SidebarProvider>
			<AppSidebar />
			{/* pr-2 to match sidebar */}
			<main className="mx-auto w-full max-w-6xl pt-2 pr-2">
				<Header />
				{children}
			</main>
		</SidebarProvider>
	)
}

function Header() {
	const {page} = useNavigation()
	return (
		<header className="gap-sm flex items-center">
			<SidebarTrigger />
			<h2>{page}</h2>
		</header>
	)
}
