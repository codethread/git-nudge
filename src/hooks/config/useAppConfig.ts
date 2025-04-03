import type {IStorageConfig} from "@/hooks/useBridge"
import {duration} from "@/lib/duration"
import type {Logger} from "@/lib/logger"
import {pick, useNeededContext} from "@/lib/utils"
import type {QueryClientConfig} from "@tanstack/react-query"
import {produce} from "immer"
import React from "react"
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

export type IGitLab = Ready<GitLabInit>

type LoginConf = Pick<IGitLab, "token" | "user" | "domain">

interface IAppConfigState extends IStorageConfig {
	/** enable to use a fake local cache for GitLab requests */
	fakeLab: boolean

	query: QueryConfig

	gitlab: GitLabInit

	dev?: {enabled: boolean}

	registered: {
		clearCache?: () => void
	}
}

const initialQueryConfig: QueryConfig["options"] = {
	queries: {
		refetchIntervalInBackground: true,
		staleTime: 0,
		gcTime: duration(1, "days"),
		retry: 3,
	},
}

const initialFakeQueryConfig = produce(initialQueryConfig, (c) => {
	c.queries ??= {}
	c.queries.retry = false
})

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
	logger: Logger
	persistHash: string
	isFakeLab: boolean
	stored: IStorageConfig
	initial: Partial<IAppConfigState>
}

export function createAppConfigStore(init: InitAppConfigStore) {
	return createStore<IAppConfig>()(
		immer((set, get) => {
			const {logger: loggerFact, persistHash, stored, isFakeLab, initial} = init
			const logger = loggerFact.context("🍁 app config")
			logger.debug("createAppConfigStore", init)
			const initialState: IAppConfigState = {
				dev: __IS_DEV__
					? {
							enabled: true,
						}
					: undefined,
				fakeLab: isFakeLab,
				global: {
					requestTimeoutMillis: stored.global.requestTimeoutMillis,
				},
				query: {
					persistHash,
					options: isFakeLab ? initialFakeQueryConfig : initialQueryConfig,
				},
				gitlab: {state: "init"},
				registered: {},

				...initial,
			}

			logger.debug("initialState", initialState)

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
					const isFakeLab = !fakeLab
					set((s) => {
						s.fakeLab = isFakeLab
						// @ts-expect-error writable store going into a readonly type
						s.query.options = isFakeLab
							? initialFakeQueryConfig
							: initialQueryConfig
					})
					clearClientCache()
				},

				registerCallback: (key, fn) => {
					set((s) => {
						s.registered[key] = fn
					})
				},
			}
			return {...initialState, ...actions}
		}),
	)
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

export function useIsDev() {
	return useAppConfigSelector((s) => s.dev?.enabled)
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

// #endregion
