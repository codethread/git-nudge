import {BridgeProvider, createBridge} from "./hooks/useBridge"
import {ConfigProvider} from "./hooks/useConfig"
import {FetcherProvider} from "./hooks/useFetcher"
import {throwError} from "./lib/utils"
import {Dashboard} from "./page/Dashboard"
import Layout from "./page/Layout"
import {Setup} from "./page/Setup"
import {useQuery} from "@tanstack/react-query"
import {useState} from "react"

function App({clearCache}: {clearCache: () => void}) {
	const [badConfig, setBadConfig] = useState(false)
	const [withFakeFetcher, setFetcherFake] = useState(__FAKE_FETCHER__)
	const {error, data, isPending, refetch} = useQuery({
		queryKey: ["contexts", {withFakeFetcher}] as const,
		retry: false,
		queryFn: async ({queryKey: [_, {withFakeFetcher}]}) => {
			const bridge = await createBridge()
			const net = await bridge.readNetrc().catch((e) => {
				if (withFakeFetcher) {
					return "machine gitlab.com login me password me"
				}
				setBadConfig(true)
				throwError(e)
			})
			const storedConfig = await bridge.readStoredConfig()
			if (badConfig) setBadConfig(false)
			return {
				bridge,
				netrcStr: net,
				storedConfig,
			}
		},
	})

	if (badConfig) {
		return <Setup onRetry={refetch} />
	}

	if (error) {
		return <div>{error.message}</div>
	}

	if (isPending) {
		return null
		// return <div>...loading</div>;
	}

	return (
		<BridgeProvider bridge={data.bridge}>
			<ConfigProvider netrcStr={data.netrcStr} initConfig={data.storedConfig}>
				<FetcherProvider withFakeFetcher={withFakeFetcher}>
					<Layout
						actions={{
							clearCache,
							toggleFetcher: () => setFetcherFake((f) => !f),
						}}
					>
						<Dashboard />
					</Layout>
				</FetcherProvider>
			</ConfigProvider>
		</BridgeProvider>
	)
}

export default App
