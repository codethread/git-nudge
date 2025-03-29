import Layout from "@/components/Layout"
import {ReactQueryProvider} from "@/components/QueryProvider"
import {LoaderPage} from "@/components/ui/Loader"
import {
	appConfigContext,
	createAppConfigStore,
	type IAppConfigStore,
} from "@/hooks/config/useAppConfig"
import {bridgeContext, createBridge, type IBridge} from "@/hooks/useBridge"
import {PageManager} from "@/page/PageManager"
import {useEffect, useState} from "react"

const search = window.location.search

export function App() {
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
						<PageManager />
					</Layout>
				</ReactQueryProvider>
			</appConfigContext.Provider>
		</bridgeContext.Provider>
	)
}
