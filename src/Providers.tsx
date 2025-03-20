import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';
import {QueryClient} from '@tanstack/react-query';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import {Terminal} from 'lucide-react';
import {useState} from 'react';
import {ErrorBoundary, type FallbackProps} from 'react-error-boundary';
import App from './App';
import {ThemeProvider} from './components/theme-provider';
import {Alert, AlertDescription, AlertTitle} from './components/ui/alert';
import {duration} from './lib/duration';
import {asyncStorage} from './lib/storage';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: duration(1, 'days'),
		},
	},
});

const asyncStoragePersister = createAsyncStoragePersister({
	storage: asyncStorage,
});

export function Providers() {
	const [buster, setBuster] = useState(__HASH__);
	return (
		<ThemeProvider>
			<div className="bg-background text-foreground flex justify-center m-6">
				<ErrorBoundary FallbackComponent={ErrorComp}>
					<PersistQueryClientProvider
						client={queryClient}
						persistOptions={{persister: asyncStoragePersister, buster}}
					>
						<App
							clearCache={() => {
								setBuster(Math.random().toFixed(10));
								queryClient.clear();
							}}
						/>
					</PersistQueryClientProvider>
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
