import {useConfigRequest} from "./useConfig"
import type {Fetcher} from "@/lib/fetcher/web"
import {useQuery} from "@tanstack/react-query"
import React from "react"

const Context = React.createContext<null | Fetcher>(null)

interface Props extends IChildren {
	withFakeFetcher?: boolean
}

export function useFetcher() {
	const f = React.useContext(Context)
	if (!f) throw new Error("useFetcher must be used inside FetcherProvider")
	return f
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

	return <Context.Provider value={data}>{children}</Context.Provider>
}
