import {Loader, LoaderPage} from "@/components/loader"
import {PageManager} from "@/components/page-manager"
import {Alert, AlertTitle, AlertDescription} from "@/components/ui/alert"
import {
	bridgeContext,
	createBridge,
	useBridge,
	type IBridge,
} from "@/hooks/bridge/useBridge"
import {
	appConfigContext,
	createAppConfigStore,
	useAppConfigAction,
	useAppConfigSelector,
	type IAppConfigStore,
} from "@/hooks/config/useConfig"
import {asyncStorage} from "@/lib/storage"
import {parseError} from "@/lib/utils"
import Layout from "@/page/Layout"
import {createAsyncStoragePersister} from "@tanstack/query-async-storage-persister"
import {QueryClient} from "@tanstack/react-query"
import {PersistQueryClientProvider} from "@tanstack/react-query-persist-client"
import {Terminal} from "lucide-react"
import {useEffect, useMemo, useRef, useState} from "react"
import {ErrorBoundary, type FallbackProps} from "react-error-boundary"

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
		<ErrorBoundary FallbackComponent={ErrorComp}>
			<bridgeContext.Provider value={bridge}>
				<appConfigContext.Provider value={config}>
					<ReactQueryProvider>
						<Layout>
							<PageManager />
						</Layout>
					</ReactQueryProvider>
				</appConfigContext.Provider>
			</bridgeContext.Provider>
		</ErrorBoundary>
	)
}

function ReactQueryProvider({children}: IChildren) {
	const {logger} = useBridge()
	const isFakeLab = useAppConfigSelector((s) => s.fakeLab)
	const persistHash = useAppConfigSelector((s) => s.query.persistHash)
	const queryOptions = useAppConfigSelector((s) => s.query.options)
	const {registerCallback} = useAppConfigAction()

	const client = useRef<QueryClient>()

	if (!client.current) {
		const c = new QueryClient({defaultOptions: queryOptions})
		client.current = c
		logger.debug("create queryClient", c)
		registerCallback("clearCache", () => c.clear())
	}

	useEffect(() => {
		client.current?.setDefaultOptions(queryOptions)
	}, [queryOptions])

	const asyncStoragePersister = useMemo(
		() =>
			createAsyncStoragePersister({
				storage: asyncStorage,
				key: isFakeLab ? "FAKE_QUERY" : "REACT_QUERY",
			}),
		[isFakeLab],
	)

	return (
		<PersistQueryClientProvider
			client={client.current}
			persistOptions={{
				persister: asyncStoragePersister,
				buster: persistHash,
			}}
		>
			{children}
		</PersistQueryClientProvider>
	)
}

function ErrorComp({error}: FallbackProps) {
	const info = parseError(error)
	return (
		<div className="m-md">
			<Alert>
				<AlertTitle className="gap-sm flex items-end text-xl text-red-400">
					<Terminal className="stroke-red-400" />
					Blimey!
				</AlertTitle>
				<AlertDescription className="my-sm">
					<pre className="w-full overflow-x-scroll">{info}</pre>
				</AlertDescription>
			</Alert>
		</div>
	)
}
