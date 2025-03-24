import {duration} from "@/lib/duration"
import type {RequestConfig} from "@/lib/fetcher/web"
import React from "react"
import {z} from "zod"
import {createStore, useStore} from "zustand"
import {combine} from "zustand/middleware"
import {useShallow} from "zustand/react/shallow"

export const StorageConfigSchema = z
	.object(
		{
			global: z
				.object(
					{
						requestTimeoutMillis: z
							.number()
							.gt(0)
							.int()
							.default(duration(5, "secs")),
					},
					{
						message: "dev error, missing defaults",
					},
				)
				.default({}),
		},
		{message: "dev error, missing defaults"},
	)
	.default({})

type StorageConfig = z.TypeOf<typeof StorageConfigSchema>

export interface IConfig extends StorageConfig {
	gitlab: {
		domain: string
		user: string
		token: string
	}
}

type ConfigStore = ReturnType<typeof createConfigStore>

export function createConfigStore(config: IConfig) {
	return createStore(
		combine(config, (set) => ({
			setConfig: <Key extends keyof IConfig>(key: Key, value: IConfig[Key]) =>
				set({[key]: value}),
		})),
	)
}

export const configContext = React.createContext<null | ConfigStore>(null)

function useConfigStore() {
	const c = React.useContext(configContext)
	if (!c) throw new Error("ah")
	return c
}

export function useConfigSetter() {
	const store = useConfigStore()
	return useStore(store, (s) => s.setConfig)
}

export function useConfigRequest() {
	const store = useConfigStore()
	return useStore(
		store,
		useShallow(
			(s): RequestConfig => ({
				domain: s.gitlab.domain,
				token: s.gitlab.token,
				timeout: s.global.requestTimeoutMillis,
			}),
		),
	)
}
export const useConfigMe = () =>
	useStore(
		useConfigStore(),
		useShallow((s) => ({username: s.gitlab.user})),
	)
