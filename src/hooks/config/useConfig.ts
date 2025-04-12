import type {IAppConfigStore, IGitLab} from "@/hooks/config/useAppConfig"
import {duration, type IDuration} from "@/lib/duration"
import {useNeededContext} from "@/lib/utils"
import {derive} from "derive-zustand"
import React from "react"
import {match} from "ts-pattern"
import type {Simplify} from "type-fest"
import {useStore} from "zustand"

interface IConfigState {
	isFakeLab: boolean
	gitlab: Simplify<Omit<IGitLab, "token" | "state">>
	myMRsRefreshRate: IDuration
}

type IConfig = IConfigState
type IConfigStore = ReturnType<typeof createConfigStore>

export function createConfigStore(appConfigStore: IAppConfigStore) {
	return derive<IConfig>((get) => {
		const conf = get(appConfigStore)
		const other: Omit<IConfigState, "isFakeLab" | "gitlab"> = {
			myMRsRefreshRate: {
				amount: 10,
				unit: "secs",
			},
		}
		return match(conf)
			.returnType<IConfig>()
			.with({gitlab: {state: "ready"}}, (c) => ({
				gitlab: {domain: c.gitlab.domain, user: c.gitlab.user},
				isFakeLab: conf.fakeLab,
				...other,
			}))
			.with({fakeLab: true}, () => ({
				gitlab: {domain: "fakelab.io", user: "test.user"},
				isFakeLab: true,
				...other,
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
