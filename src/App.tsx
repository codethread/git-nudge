import {BridgeProvider, createBridge} from "./hooks/useBridge";
import {ConfigProvider} from "./hooks/useConfig";
import {throwError} from "./lib/utils";
import {Dashboard} from "./page/Dashboard";
import Layout from "./page/Layout";
import {Setup} from "./page/Setup";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";

function App({clearCache}: {clearCache: () => void}) {
	const [badConfig, setBadConfig] = useState(false);
	const {error, data, isPending, refetch} = useQuery({
		queryKey: ["contexts"],
		retry: false,
		queryFn: async () => {
			const bridge = await createBridge();
			const net = await bridge.readNetrc().catch((e) => {
				setBadConfig(true);
				throwError(e);
			});
			const storedConfig = await bridge.readStoredConfig();
			if (badConfig) setBadConfig(false);
			return {
				bridge,
				netrcStr: net,
				storedConfig,
			};
		},
	});

	if (badConfig) {
		return <Setup onRetry={refetch} />;
	}

	if (error) {
		return <div>{error.message}</div>;
	}

	if (isPending) {
		return null;
		// return <div>...loading</div>;
	}

	return (
		<BridgeProvider bridge={data.bridge}>
			<ConfigProvider netrcStr={data.netrcStr} initConfig={data.storedConfig}>
				<Layout actions={{clearCache}}>
					<Dashboard />
				</Layout>
			</ConfigProvider>
		</BridgeProvider>
	);
}

export default App;
