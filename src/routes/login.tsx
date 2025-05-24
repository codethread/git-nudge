import {LoaderPage} from "@/components/ui/Loader"
import {createFileRoute} from "@tanstack/react-router"
import React, {Suspense} from "react"

const LoginPage = React.lazy(() => import("@/page/Login"))

function LoginComponent() {
	return (
		<Suspense fallback={<LoaderPage />}>
			<LoginPage />
		</Suspense>
	)
}

export const Route = createFileRoute("/login")({
	component: LoginComponent,
})
