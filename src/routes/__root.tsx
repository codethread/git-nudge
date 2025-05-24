import Layout from "@/components/Layout"
import {ReactQueryProvider} from "@/components/QueryProvider"
import {LoaderPage} from "@/components/ui/Loader"
import {
	appConfigContext,
	createAppConfigStore,
	type IAppConfigStore,
} from "@/hooks/config/useAppConfig"
import {bridgeContext, createBridge, type IBridge} from "@/hooks/useBridge"
import {createRootRoute, Outlet} from "@tanstack/react-router"
import {TanStackRouterDevtools} from "@tanstack/react-router-devtools"
import {useEffect, useState} from "react"

const search = window.location.search

function RootComponent() {
	const [bridge, setBridge] = useState<IBridge>()
	const [config, setConfig] = useState<IAppConfigStore>()

	useEffect(() => {
		createBridge().then((b) => {
			setBridge(b)
			setConfig(
				createAppConfigStore({
					logger: b.logger,
					persistHash: __HASH__ || Math.random().toFixed(10),
					isFakeLab: search.includes("real")
						? false
						: search.includes("fake") || __FAKE_FETCHER__,
					stored: b?.storedConfig,
					initial: {},
				}),
			)
		})
	}, [])

	if (!bridge || !config) {
		return <LoaderPage />
	}

	return (
		<bridgeContext.Provider value={bridge}>
			<appConfigContext.Provider value={config}>
				<ReactQueryProvider>
					<Layout>
						<Outlet />
					</Layout>
				</ReactQueryProvider>
			</appConfigContext.Provider>
			<TanStackRouterDevtools />
		</bridgeContext.Provider>
	)
}

export const Route = createRootRoute({
	component: RootComponent,
})
