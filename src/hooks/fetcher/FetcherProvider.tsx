import {fetcherContext, useFakeConfig} from "./useFetcher"
import {LoaderPage} from "@/components/ui/Loader"
import type {RequestConfig} from "@/lib/fetcher/web"
import {useQuery} from "@tanstack/react-query"
import {useMemo} from "react"

interface Props extends IChildren {
	withFake?: boolean
	reqConf: RequestConfig
}

export function FetcherProvider({children, withFake, reqConf}: Props) {
	// if using fakes, we want to rebuild the fetcher in order to rebuild the fake database
	const fakeKey = useMemo(() => (withFake ? Math.random() : false), [withFake])
	const {users, setUsers} = useFakeConfig()

	const {data, error, isPending, isSuccess} = useQuery({
		retry: withFake ? 0 : 3,
		staleTime: Number.POSITIVE_INFINITY,
		refetchOnMount: false,
		refetchInterval: Number.POSITIVE_INFINITY,
		queryKey: ["fetcher", fakeKey, reqConf, users] as const,
		queryFn: async ({queryKey: [_, withFake, c, users]}) => {
			const {createFetcher} = await (withFake
				? import("@/lib/fetcher/fake")
				: import("@/lib/fetcher/web"))
			// await new Promise(() => {})
			return createFetcher(c, {dbConfig: {users}})
		},
	})

	if (error) throw error
	if (isPending) return <LoaderPage />
	if (!isSuccess) throw new Error("FetcherProvider failed")

	return (
		<fetcherContext.Provider value={data}>{children}</fetcherContext.Provider>
	)
}
