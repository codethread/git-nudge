import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import {readFileSync} from "node:fs"
import os from "node:os"
import path from "node:path"
import {defineConfig} from "vite"

const host = process.env.TAURI_DEV_HOST

process.env.VITE_FAKE_NETRC = (() => {
	try {
		return readFileSync(path.join(os.homedir(), ".netrc"), "utf8")
	} catch (e) {
		return ""
	}
})()

// https://vitejs.dev/config/
export default defineConfig({
	logLevel: "warn",
	plugins: [react(), tailwindcss()],
	define: {
		__HASH__: Math.random().toFixed(10),
		__FAKE_FETCHER__: true,
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	clearScreen: false,
	// 2. tauri expects a fixed port, fail if that port is not available
	server: {
		port: 1420,
		strictPort: true,
		host: host || false,
		hmr: host
			? {
					protocol: "ws",
					host,
					port: 1421,
				}
			: undefined,
		watch: {
			// 3. tell vite to ignore watching `src-tauri`
			ignored: ["**/src-tauri/**"],
		},
	},
})
