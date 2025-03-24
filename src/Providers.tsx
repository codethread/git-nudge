import App from "./App"
import {ThemeProvider} from "./components/theme-provider"
import {Alert, AlertDescription, AlertTitle} from "./components/ui/alert"
import {duration} from "./lib/duration"
import {asyncStorage} from "./lib/storage"
import {createAsyncStoragePersister} from "@tanstack/query-async-storage-persister"
import {QueryClient} from "@tanstack/react-query"
import {PersistQueryClientProvider} from "@tanstack/react-query-persist-client"
import {Terminal} from "lucide-react"
import {useState} from "react"
import {ErrorBoundary, type FallbackProps} from "react-error-boundary"
import {ZodError} from "zod"
import {fromError} from "zod-validation-error"

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: duration(1, "days"),
		},
	},
})

const asyncStoragePersister = createAsyncStoragePersister({
	storage: asyncStorage,
})

export function Providers() {
	const [buster, setBuster] = useState(__HASH__)
	return (
		<ThemeProvider>
			<div className="bg-background text-foreground flex justify-center">
				<ErrorBoundary FallbackComponent={ErrorComp}>
					<PersistQueryClientProvider
						client={queryClient}
						persistOptions={{persister: asyncStoragePersister, buster}}
					>
						<App
							clearCache={() => {
								setBuster(Math.random().toFixed(10))
								queryClient.clear()
							}}
						/>
					</PersistQueryClientProvider>
				</ErrorBoundary>
			</div>
		</ThemeProvider>
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

function parseError(e: unknown): string {
	if (e instanceof ZodError) {
		return fromError(e).toString()
	}
	if (e instanceof Error) {
		return e?.stack || e.message
	}

	return JSON.stringify(e)
}
