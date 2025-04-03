import {duration} from "@/lib/duration"
import {logger} from "@/lib/logger"
import {asyncStorage} from "@/lib/storage"
import {parseError} from "@/lib/utils"
import React from "react"
import {z} from "zod"

const STORAGE_KEY = "STORAGE_KEY"
/**
 * Subset of config that can be persisted
 *
 * NOTE: keep subset small and derive client config
 */
const storageConfigSchema = z
	.object(
		{
			global: z
				.object(
					{
						requestTimeoutMillis: z
							.number()
							.int()
							.gt(0)
							.default(duration(5, "secs")),
					},
					{
						message: "dev error, missing defaults",
					},
				)
				.default({}),
		},
		{message: "dev error, missing defaults"},
	)
	.default({})

export type IStorageConfig = z.TypeOf<typeof storageConfigSchema>

export type IBridge = Awaited<ReturnType<typeof createFakeBridge>>

export const bridgeContext = React.createContext<null | IBridge>(null)

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

interface Notifier {
	notify: (msg: string) => Promise<void>
}

async function createFakeBridge() {
	const notify: Notifier["notify"] = async (msg: string) => {
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
	}

	const storedConfig = await readStoredConfig({notify})
	return {
		storedConfig,
		setStoredConfig,
		readNetrc: async () => __FAKE_NETRC__,
		notify,
		logger,
	}
}

async function createTauriBridge() {
	const {invoke} = await import("@tauri-apps/api/core")

	const notify: Notifier["notify"] = async (msg) => {
		const {isPermissionGranted, requestPermission, sendNotification} =
			await import("@tauri-apps/plugin-notification")

		let permissionGranted = await isPermissionGranted()

		if (!permissionGranted) {
			const permission = await requestPermission()
			permissionGranted = permission === "granted"
		}

		if (!permissionGranted)
			throw new Error("You need to give notification permissions to the app")
		sendNotification({title: "Tauri", body: msg})
	}

	const storedConfig = await readStoredConfig({notify})

	const api: IBridge = {
		storedConfig,
		setStoredConfig,
		readNetrc: () =>
			invoke("read_netrc")
				.then((n) => z.string().parse(n))
				.catch((e) => {
					logger.error("error reading netrc from tauri", parseError(e))
					return undefined
				}),
		notify,
		logger: logger,
	}
	return api
}

/** for now local storage is fine */
async function readStoredConfig({notify}: Notifier) {
	const stored = await asyncStorage.getItem("CONFIG")
	try {
		return storageConfigSchema.parse(JSON.parse(stored ?? "{}"))
	} catch (e) {
		notify("Error reading config, data reset")
		logger.warn("Invalid config")
		logger.info({stored, errorMsg: parseError(e), error: e})

		asyncStorage.removeItem(STORAGE_KEY)
		// default config should be set for all values
		return storageConfigSchema.parse({})
	}
}
async function setStoredConfig(config: IStorageConfig) {
	// validate on store
	storageConfigSchema.parse(config)
	asyncStorage.setItem("CONFIG", JSON.stringify(config))
}
