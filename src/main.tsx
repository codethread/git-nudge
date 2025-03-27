import {App} from "./App"
import "./styles.css"
import {ThemeProvider} from "@/hooks/theme/theme-provider"
import React from "react"
import ReactDOM from "react-dom/client"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider>
			<div className="flex justify-center">
				<App />
			</div>
		</ThemeProvider>
	</React.StrictMode>,
)
