import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ErrorBoundary
			fallbackRender={({ error }) => {
				return (
					<div role="alert">
						<p>Something went wrong:</p>
						<pre style={{ color: "red" }}>{error.message}</pre>
						<pre>{error.stack}</pre>
					</div>
				);
			}}
		>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</ErrorBoundary>
	</React.StrictMode>,
);
