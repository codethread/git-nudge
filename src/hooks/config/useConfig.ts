import type {IAppConfigStore, IGitLab} from "@/hooks/config/useAppConfig"
import {useNeededContext} from "@/lib/utils"
import {derive} from "derive-zustand"
import React from "react"
import {match} from "ts-pattern"
import type {Simplify} from "type-fest"
import {useStore} from "zustand"

interface IConfigState {
	isFakeLab: boolean
	gitlab: Simplify<Omit<IGitLab, "token" | "state">>
}

type IConfig = IConfigState
type IConfigStore = ReturnType<typeof createConfigStore>

export function createConfigStore(appConfigStore: IAppConfigStore) {
	return derive<IConfig>((get) => {
		const conf = get(appConfigStore)
		return match(conf)
			.returnType<IConfig>()
			.with({gitlab: {state: "ready"}}, (c) => ({
				gitlab: {domain: c.gitlab.domain, user: c.gitlab.user},
				isFakeLab: conf.fakeLab,
			}))
			.with({fakeLab: true}, () => ({
				isFakeLab: true,
				gitlab: {
					domain: "fakelab.io",
					user: "test.user",
				},
			}))
			.with({gitlab: {state: "init"}}, () => {
				// NOTE: could make a static check by syncing state rather than deriving, will see how it goes
				//
				// should be protected by Providers
				throw new Error("ConfigStore expected to be given an initialsed config")
			})
			.exhaustive()
	})
}

export const configContext = React.createContext<null | IConfigStore>(null)

function useConfigStore() {
	return useNeededContext({configContext})
}

export function useConfigSelector<U>(selector: (state: IConfigState) => U): U {
	const store = useConfigStore()
	return useStore(store, selector)
}
