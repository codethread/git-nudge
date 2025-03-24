import type {Fetcher} from "@/lib/fetcher/web"
import React from "react"

export const fetcherContext = React.createContext<null | Fetcher>(null)

export function useFetcher() {
	const f = React.useContext(fetcherContext)
	if (!f) throw new Error("useFetcher must be used inside FetcherProvider")
	return f
}
