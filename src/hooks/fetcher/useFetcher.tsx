import type {Fetcher} from "@/lib/fetcher/web"
import React from "react"
import {create} from "zustand"
import {combine} from "zustand/middleware"

export const fetcherContext = React.createContext<null | Fetcher>(null)

export function useFetcher() {
	const f = React.useContext(fetcherContext)
	if (!f) throw new Error("useFetcher must be used inside FetcherProvider")
	return f
}
export const useFakeConfig = create(
	combine({users: 37}, (set) => ({
		setUsers: (count: number) => set({users: count}),
	})),
)
