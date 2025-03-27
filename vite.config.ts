import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import {readFileSync} from "node:fs"
import os from "node:os"
import path from "node:path"
import {defineConfig} from "vite"

const host = process.env.TAURI_DEV_HOST

// https://vitejs.dev/config/
export default defineConfig(({command}) => {
	const FAKE_NETRC = (() => {
		try {
			return command === "serve"
				? readFileSync(path.join(os.homedir(), ".netrc"), "utf8")
				: ""
		} catch (e) {
			return ""
		}
	})()

	return {
		logLevel: "warn",
		plugins: [react(), tailwindcss()],
		define: {
			// TODO: get from build
			__HASH__: process.env.BUILD_HASH,
			__FAKE_FETCHER__: command === "serve",
			__FAKE_NETRC__: JSON.stringify(FAKE_NETRC),
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
	}
})
