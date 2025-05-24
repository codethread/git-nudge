import {RouteProviders} from "@/components/RouteProviders"
import {LoaderPage} from "@/components/ui/Loader"
import {createFileRoute} from "@tanstack/react-router"
import React, {Suspense} from "react"

const WelcomePage = React.lazy(() => import("@/page/Welcome"))

function WelcomeComponent() {
	return (
		<RouteProviders>
			<Suspense fallback={<LoaderPage />}>
				<WelcomePage />
			</Suspense>
		</RouteProviders>
	)
}

export const Route = createFileRoute("/welcome")({
	component: WelcomeComponent,
})
