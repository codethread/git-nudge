import {App} from "./App"
import "./styles.css"
import {ErrorBoundary} from "@/components/ErrorBoundary"
import {ThemeProvider} from "@/hooks/theme/ThemeProvider"
import React from "react"
import ReactDOM from "react-dom/client"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider>
			<div className="flex justify-center">
				<ErrorBoundary>
					<App />
				</ErrorBoundary>
			</div>
		</ThemeProvider>
	</React.StrictMode>,
)
