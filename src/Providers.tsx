import App from "./App";
import {ThemeProvider} from "./components/theme-provider";
import {Alert, AlertDescription, AlertTitle} from "./components/ui/alert";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Terminal} from "lucide-react";
import {ErrorBoundary, FallbackProps} from "react-error-boundary";

const queryClient = new QueryClient();

export function Providers() {
	return (
		<ThemeProvider>
			<div className="bg-background text-foreground flex justify-center m-6">
				<ErrorBoundary FallbackComponent={ErrorComp}>
					<QueryClientProvider client={queryClient}>
						<App />
					</QueryClientProvider>
				</ErrorBoundary>
			</div>
		</ThemeProvider>
	);
}

function ErrorComp({error}: FallbackProps) {
	return (
		<div className="m-6">
			<Alert>
				<Terminal className="h-4 w-4" />
				<AlertTitle>Now then!</AlertTitle>
				<AlertDescription className="my-4">
					<pre className="overflow-x-scroll w-full">{error.stack}</pre>
				</AlertDescription>
			</Alert>
		</div>
	);
}
