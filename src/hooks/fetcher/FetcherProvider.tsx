import {fetcherContext} from "./useFetcher"
import {LoaderPage} from "@/components/ui/Loader"
import type {RequestConfig} from "@/lib/fetcher/web"
import {useQuery} from "@tanstack/react-query"

interface Props extends IChildren {
	withFake?: boolean
	reqConf: RequestConfig
}

export function FetcherProvider({children, withFake, reqConf}: Props) {
	const {data, error, isPending, isSuccess} = useQuery({
		retry: withFake ? 0 : 3,
		refetchOnMount: false,
		refetchInterval: Number.POSITIVE_INFINITY,
		queryKey: ["fetcher", withFake, reqConf] as const,
		queryFn: async ({queryKey: [_, withFake, c]}) => {
			const {createFetcher} = await (withFake
				? import("@/lib/fetcher/fake")
				: import("@/lib/fetcher/web"))
			// await new Promise(() => {})
			return createFetcher(c)
		},
	})

	if (error) throw error
	if (isPending) return <LoaderPage />
	if (!isSuccess) throw new Error("FetcherProvider failed")

	return (
		<fetcherContext.Provider value={data}>{children}</fetcherContext.Provider>
	)
}
