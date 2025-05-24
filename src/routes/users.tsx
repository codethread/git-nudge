import {RouteProviders} from "@/components/RouteProviders"
import {LoaderPage} from "@/components/ui/Loader"
import {createFileRoute} from "@tanstack/react-router"
import React, {Suspense} from "react"

const UsersPage = React.lazy(() => import("@/page/Users"))

function UsersComponent() {
	return (
		<RouteProviders>
			<Suspense fallback={<LoaderPage />}>
				<UsersPage />
			</Suspense>
		</RouteProviders>
	)
}

export const Route = createFileRoute("/users")({
	component: UsersComponent,
})
