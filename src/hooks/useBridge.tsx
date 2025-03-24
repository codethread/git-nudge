import type {IConfig} from "./useConfig"
import {asyncStorage} from "@/lib/storage"
import React from "react"

export type IBridge = Awaited<ReturnType<typeof createFakeBridge>>

const bridgeContext = React.createContext<null | IBridge>(null)

interface Props extends IChildren {
	bridge: IBridge
}

export const BridgeProvider = ({children, bridge}: Props) => {
	return (
		<bridgeContext.Provider value={bridge}>{children}</bridgeContext.Provider>
	)
}

export const useBridge = () => {
	const b = React.useContext(bridgeContext)
	if (!b) throw new Error("useBridge not inside BridgeProvider")
	return b
}

export async function createBridge() {
	return "__TAURI_INTERNALS__" in window
		? createTauriBridge()
		: createFakeBridge()
}

async function createFakeBridge() {
	return {
		readNetrc: async () => {
			const netrc = import.meta.env.VITE_FAKE_NETRC
			if (!netrc) {
				throw new Error("no netrc")
			}
			return netrc as string
		},
		readStoredConfig: async () => {
			try {
				const stored = await asyncStorage.getItem("CONFIG")
				return stored ? JSON.parse(stored) : undefined
			} catch (e) {
				console.warn(e)
				return undefined
			}
		},
		setStoredConfig: async (config: IConfig) => {
			asyncStorage.setItem("CONFIG", JSON.stringify(config))
		},
		notify: async (msg: string) => {
			if (!("Notification" in window)) {
				// Check if the browser supports notifications
				alert("This browser does not support desktop notification")
			} else if (Notification.permission === "granted") {
				// Check whether notification permissions have already been granted;
				// if so, create a notification
				const notification = new Notification(msg, {
					body: "body",
					requireInteraction: true,
					data: {foo: "bar"},
				})
				notification.onclick = (e) => {
					// e.preventDefault();
					// window.open("https://google.com", "_blank");
					window.alert(JSON.stringify(notification.data))
					notification.close()
				}
				// …
			} else if (Notification.permission !== "denied") {
				// We need to ask the user for permission
				Notification.requestPermission().then((permission) => {
					// If the user accepts, let's create a notification
					if (permission === "granted") {
						const notification = new Notification("Hi there!", {})
						// …
					}
				})
			}
		},
	}
}
async function createTauriBridge() {
	const {invoke} = await import("@tauri-apps/api/core")
	const {isPermissionGranted, requestPermission, sendNotification} =
		await import("@tauri-apps/plugin-notification")

	let permissionGranted = await isPermissionGranted()

	if (!permissionGranted) {
		const permission = await requestPermission()
		permissionGranted = permission === "granted"
	}

	const api: IBridge = {
		readNetrc: () => invoke("read_netrc"),
		notify: async (msg) => {
			if (!permissionGranted)
				throw new Error("You need to give notification permissions to the app")
			sendNotification({title: "Tauri", body: msg})
		},
	}
	return api
}
