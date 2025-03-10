import React from "react";

export type IBridge = Awaited<ReturnType<typeof createFakeBridge>>;

const bridgeContext = React.createContext<null | IBridge>(null);

interface Props extends IChildren {
	bridge: IBridge;
}

export const BridgeProvider = ({ children, bridge }: Props) => {
	return (
		<bridgeContext.Provider value={bridge}>{children}</bridgeContext.Provider>
	);
};

export const useBridge = () => {
	const b = React.useContext(bridgeContext);
	if (!b) throw new Error("useBridge not inside BridgeProvider");
	return b;
};

export async function createBridge() {
	return "__TAURI_INTERNALS__" in window
		? createTauriBridge()
		: createFakeBridge();
}

async function createFakeBridge() {
	return {
		readNetrc: async () => {
			return import.meta.env.VITE_FAKE_NETRC;
		},
		notify: async (msg: string) => {
			window.alert(msg);
		},
	};
}
async function createTauriBridge() {
	const { invoke } = await import("@tauri-apps/api/core");
	const { isPermissionGranted, requestPermission, sendNotification } =
		await import("@tauri-apps/plugin-notification");

	let permissionGranted = await isPermissionGranted();

	if (!permissionGranted) {
		const permission = await requestPermission();
		permissionGranted = permission === "granted";
	}

	const api: IBridge = {
		readNetrc: () => invoke("read_netrc"),
		notify: async (msg) => {
			if (!permissionGranted)
				throw new Error("You need to give notification permissions to the app");
			sendNotification({ title: "Tauri", body: msg });
		},
	};
	return api;
}
