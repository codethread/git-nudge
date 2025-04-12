import type {Fetcher} from "@/lib/fetcher/web"
import React from "react"
import {create, createStore, useStore} from "zustand"
import {combine} from "zustand/middleware"

export const fetcherContext = React.createContext<null | Fetcher>(null)

export function useFetcher() {
	const f = React.useContext(fetcherContext)
	if (!f) throw new Error("useFetcher must be used inside FetcherProvider")
	return f
}

export const fakeConfigStore = createStore(
	combine({users: 2}, (set) => ({
		setUsers: (count: number) => set({users: count}),
	})),
)
export const useFakeConfig = () => useStore(fakeConfigStore)

const fakeConf = {
	addUser() {
		window.__db.addUser()
		fakeConfigStore.setState((s) => ({users: s.users++}))
	},
}

window.__fake = fakeConf
