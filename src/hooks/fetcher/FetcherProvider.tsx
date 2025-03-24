import {fetcherContext} from "./useFetcher"
import {useConfigRequest} from "@/hooks/config/useConfig"
import {useQuery} from "@tanstack/react-query"

interface Props extends IChildren {
	withFakeFetcher?: boolean
}

export function FetcherProvider({children, withFakeFetcher}: Props) {
	const conf = useConfigRequest()
	const {data, error, isFetching, isSuccess} = useQuery({
		retry: 0,
		refetchOnMount: false,
		refetchInterval: Number.POSITIVE_INFINITY,
		queryKey: ["fetcher", withFakeFetcher, conf] as const,
		queryFn: async ({queryKey: [_, withFake, c]}) => {
			const {createFetcher} = await (withFake
				? import("@/lib/fetcher/fake")
				: import("@/lib/fetcher/web"))
			return createFetcher(c)
		},
	})

	if (error) throw error
	if (isFetching) return null
	if (!isSuccess) throw new Error("FetcherProvider failed")

	return (
		<fetcherContext.Provider value={data}>{children}</fetcherContext.Provider>
	)
}
