import {RouteProviders} from "@/components/RouteProviders"
import {LoaderPage} from "@/components/ui/Loader"
import {createFileRoute} from "@tanstack/react-router"
import React, {Suspense} from "react"

const DashboardPage = React.lazy(() => import("@/page/Dashboard"))

function DashboardComponent() {
	return (
		<RouteProviders>
			<Suspense fallback={<LoaderPage />}>
				<DashboardPage />
			</Suspense>
		</RouteProviders>
	)
}

export const Route = createFileRoute("/")({
	component: DashboardComponent,
})
