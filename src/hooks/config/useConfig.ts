import type {IStorageConfig} from "@/hooks/bridge/useBridge"
import {duration} from "@/lib/duration"
import type {SlimLogger} from "@/lib/logger"
import {pick, useNeededContext} from "@/lib/utils"
import type {QueryClientConfig} from "@tanstack/react-query"
import {derive} from "derive-zustand"
import React from "react"
import {match} from "ts-pattern"
import type {Simplify} from "type-fest"
import {createStore, useStore} from "zustand"
import {immer} from "zustand/middleware/immer"
import {useShallow} from "zustand/react/shallow"

// #region TYPES

// #region type helpers

/** alias for consistent union discrimination, i.e: { state: 'ready' } */
type ReadyState = "ready"

/** Helper to discriminate the Ready variant from a union */
type Ready<T extends {state: unknown}> = Extract<T, {state: ReadyState}>

// #endregion

// #region config

/** react query related settings */
type QueryConfig = {
	persistHash: string
	options: NonNullable<QueryClientConfig["defaultOptions"]>
}

type GitLabInit =
	| {state: "init"}
	| {state: ReadyState; domain: string; user: string; token: string}
type IGitLab = Ready<GitLabInit>
export type LoginConf = Pick<IGitLab, "token" | "user" | "domain">

interface IAppConfigState extends IStorageConfig {
	/** enable to use a fake local cache for GitLab requests */
	fakeLab: boolean

	query: QueryConfig

	gitlab: GitLabInit

	registered: {
		clearCache?: () => void
	}
}

// #endregion

// #endregion

// #region STORE

interface IAppConfigActions {
	setConfig<Key extends keyof IAppConfigState>(
		key: Key,
		value: IAppConfigState[Key],
	): void

	clearClientCache(): void

	toggleFakeLab(): void

	registerCallback<Key extends keyof IAppConfigState["registered"]>(
		key: Key,
		value: IAppConfigState["registered"][Key],
	): void

	setLogin(conf: LoginConf): void
}

/**
 * App level config, this lives at the very top of the tree and so care should
 * be taken to avoid cascading renders
 * select diligently
 */
type IAppConfig = IAppConfigState & IAppConfigActions

export type IAppConfigStore = ReturnType<typeof createAppConfigStore>
interface InitAppConfigStore {
	logger: SlimLogger
	persistHash: string
	isFakeLab: boolean
	stored: IStorageConfig
	initial: Partial<IAppConfigState>
}

export function createAppConfigStore(init: InitAppConfigStore) {
	return createStore<IAppConfig>()(
		immer((set, get) => {
			const {logger, persistHash, stored, isFakeLab, initial} = init
			logger.debug("createAppConfigStore", init)
			const state: IAppConfigState = {
				fakeLab: isFakeLab,
				global: {
					requestTimeoutMillis: stored.global.requestTimeoutMillis,
				},
				query: {
					persistHash,
					options: {
						queries: {
							refetchIntervalInBackground: true,
							staleTime: 0,
							gcTime: duration(1, "days"),
						},
					},
				},
				gitlab: {state: "init"},
				registered: {},

				...initial,
			}

			logger.debug("initialState", state)

			const actions: IAppConfigActions = {
				setLogin: (conf) => {
					set({gitlab: {state: "ready", ...conf}})
				},
				setConfig: (key, value) => {
					if (typeof value === "object") {
						set((p) => ({...p, [key]: value}))
					}
					set({[key]: value})
				},

				clearClientCache: () => {
					set((s) => {
						s.query.persistHash = Math.random().toFixed(10)
					})
					const clear = get().registered.clearCache
					if (!clear)
						throw new Error(
							"clearCache never Registered, this should happen in the query client provider",
						)
					clear()
				},

				toggleFakeLab: () => {
					const {fakeLab, clearClientCache} = get()
					set({fakeLab: !fakeLab})
					clearClientCache()
				},

				registerCallback: (key, fn) => {
					set((s) => {
						s.registered[key] = fn
					})
				},
			}
			return {...state, ...actions}
		}),
	)
}

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
				gitlab: {
					domain: "",
					user: "test.user",
				},
				isFakeLab: conf.fakeLab,
			}))
			.with({gitlab: {state: "init"}}, () => {
				// could make a static check by syncing state rather than deriving, will see how it goes
				throw new Error("config store should be created when ready")
			})
			.exhaustive()
	})
}

// #endregion

// #region HOOKS

export const appConfigContext = React.createContext<null | IAppConfigStore>(
	null,
)

export function useAppConfigStore() {
	return useNeededContext({appConfigContext})
}

/**
 * gives access to global config, usually only needed by setup providers,
 * favour `useConfigStore`
 */
export function useAppConfigAction() {
	const store = useAppConfigStore()
	return useStore(
		store,
		useShallow((c) => {
			const actions: IAppConfigActions = pick(c, [
				"registerCallback",
				"clearClientCache",
				"toggleFakeLab",
				"setConfig",
				"setLogin",
			])
			return actions
		}),
	)
}

/**
 * gives access to global config, usually only needed by setup providers,
 * favour `useConfigStore`
 */
export function useAppConfigSelector<U>(
	selector: (state: IAppConfigState) => U,
): U {
	const store = useAppConfigStore()
	return useStore(store, selector)
}

export const configContext = React.createContext<null | IConfigStore>(null)

function useConfigStore() {
	return useNeededContext({configContext})
}

export function useConfigSelector<U>(selector: (state: IConfigState) => U): U {
	const store = useConfigStore()
	return useStore(store, selector)
}

// #endregion
