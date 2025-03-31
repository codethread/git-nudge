import {
	useAppConfigSelector,
	useAppConfigAction,
} from "@/hooks/config/useAppConfig"
import {useBridge} from "@/hooks/useBridge"
import {asyncStorage} from "@/lib/storage"
import {createAsyncStoragePersister} from "@tanstack/query-async-storage-persister"
import {QueryClient} from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
import {PersistQueryClientProvider} from "@tanstack/react-query-persist-client"
import {useRef, useEffect, useMemo} from "react"

export function ReactQueryProvider({children}: IChildren) {
	const {logger} = useBridge()
	const isFakeLab = useAppConfigSelector((s) => s.fakeLab)
	const persistHash = useAppConfigSelector((s) => s.query.persistHash)
	const queryOptions = useAppConfigSelector((s) => s.query.options)
	const {registerCallback} = useAppConfigAction()

	const client = useRef<QueryClient>()

	if (!client.current) {
		const c = new QueryClient({defaultOptions: queryOptions})
		client.current = c
		logger.debug("create queryClient", c)
		registerCallback("clearCache", () => c.clear())
	}

	useEffect(() => {
		client.current?.setDefaultOptions(queryOptions)
	}, [queryOptions])

	const asyncStoragePersister = useMemo(
		() =>
			createAsyncStoragePersister({
				storage: asyncStorage,
				key: isFakeLab ? "FAKE_QUERY" : "REACT_QUERY",
			}),
		[isFakeLab],
	)

	return (
		<PersistQueryClientProvider
			client={client.current}
			persistOptions={{
				persister: asyncStoragePersister,
				buster: persistHash,
			}}
		>
			<ReactQueryDevtools initialIsOpen={false} />
			{children}
		</PersistQueryClientProvider>
	)
}
