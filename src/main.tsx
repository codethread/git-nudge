import {App} from "./App"
import "./styles.css"
import {Alert, AlertTitle, AlertDescription} from "@/components/ui/alert"
import {ThemeProvider} from "@/hooks/theme/ThemeProvider"
import {parseError} from "@/lib/utils"
import {Terminal} from "lucide-react"
import React from "react"
import ReactDOM from "react-dom/client"
import {ErrorBoundary, type FallbackProps} from "react-error-boundary"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider>
			<div className="flex justify-center">
				<ErrorBoundary FallbackComponent={ErrorComp}>
					<App />
				</ErrorBoundary>
			</div>
		</ThemeProvider>
	</React.StrictMode>,
)

// biome-ignore lint/nursery/useComponentExportOnlyModules: <explanation>
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
