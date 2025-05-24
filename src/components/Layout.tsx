import {AppSidebar} from "@/components/AppSidebar"
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import {useLocation, useMatch, useRouterState} from "@tanstack/react-router"
import {titleCase} from "title-case"

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

const pageNames: Record<string, string> = {
	"/": "/dashboard",
}

function Header() {
	const currentPath = useLocation().pathname

	return (
		<header className="gap-sm flex items-center">
			<SidebarTrigger />
			<h2>{titleCase(pageNames[currentPath] ?? currentPath).slice(1)}</h2>
		</header>
	)
}
