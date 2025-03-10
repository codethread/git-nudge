import "./App.css";
import { createBridge, BridgeProvider } from "./hooks/useBridge";
import { ConfigProvider } from "./hooks/useConfig";
import { Dashboard } from "./page/Dashboard";
import { Setup } from "./page/Setup";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function App() {
	const [badConfig, setBadConfig] = useState(false);
	const { error, data, isPending, refetch } = useQuery({
		queryKey: ["contexts"],
		retry: false,
		queryFn: async () => {
			const bridge = await createBridge();
			const net = await bridge.readNetrc().catch((e) => {
				setBadConfig(true);
				throw new Error(e);
			});
			if (badConfig) setBadConfig(false);
			return {
				bridge,
				netrcStr: net,
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
		return <div>...loading</div>;
	}

	return (
		<BridgeProvider bridge={data.bridge}>
			<ConfigProvider netrcStr={data.netrcStr}>
				<Dashboard />
			</ConfigProvider>
		</BridgeProvider>
	);
}

export default App;
