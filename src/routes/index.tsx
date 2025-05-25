import {RouteProviders} from "@/components/RouteProviders"
import {MyMrs} from "@/page/widgets/MyMrs"
import {createFileRoute} from "@tanstack/react-router"

function DashboardComponent() {
	return (
		<RouteProviders>
			<MyMrs />
		</RouteProviders>
	)
}

export const Route = createFileRoute("/")({
	component: DashboardComponent,
})
