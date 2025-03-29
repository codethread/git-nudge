import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import {readFileSync} from "node:fs"
import os from "node:os"
import path from "node:path"
import {match} from "ts-pattern"
import {defineConfig} from "vite"

const host = process.env.TAURI_DEV_HOST

// https://vitejs.dev/config/
export default defineConfig((opts) => {
	const isProdLike = match(opts)
		.with({isPreview: true}, {command: "build"}, () => true)
		.otherwise(() => false)

	return {
		plugins: [react(), tailwindcss()],
		define: {
			__HASH__: JSON.stringify(isProdLike ? process.env.BUILD_HASH : ""),
			__FAKE_FETCHER__: !isProdLike,
			__IS_DEV__: !isProdLike,
			__FAKE_NETRC__: JSON.stringify(!isProdLike ? getNetrc() : ""),
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

function getNetrc() {
	try {
		return readFileSync(path.join(os.homedir(), ".netrc"), "utf8")
	} catch (e) {
		return ""
	}
}
