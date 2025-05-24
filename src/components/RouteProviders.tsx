import {ConfigProvider} from "@/hooks/config/ConfigProvider"
import {
	useAppConfigSelector,
	useAppConfigStore,
} from "@/hooks/config/useAppConfig"
import {FetcherProvider} from "@/hooks/fetcher/FetcherProvider"
import {useBridge} from "@/hooks/useBridge"
import {Navigate, Redirect} from "@tanstack/react-router"
import type {ReactNode} from "react"
import {match} from "ts-pattern"

interface RouteProvidersProps {
	readonly children: ReactNode
}

export function RouteProviders({children}: RouteProvidersProps) {
	const appConfigStore = useAppConfigStore()
	const isFakeLab = useAppConfigSelector((s) => s.fakeLab)
	const gitlabConf = useAppConfigSelector((s) => s.gitlab)
	const timeout = useAppConfigSelector((s) => s.global.requestTimeoutMillis)
	const logger = useBridge().logger

	return match({isFakeLab, gitlabConf})
		.with({isFakeLab: false, gitlabConf: {state: "init"}}, () => {
			// Redirect to login if config is not ready
			return <Navigate to="/login" />
		})
		.with(
			{isFakeLab: false, gitlabConf: {state: "ready"}},
			({gitlabConf: {domain, token}}) => (
				<ConfigProvider appConfigStore={appConfigStore}>
					<FetcherProvider reqConf={{domain, token, timeout, logger}}>
						{children}
					</FetcherProvider>
				</ConfigProvider>
			),
		)
		.with({isFakeLab: true}, () => (
			<ConfigProvider appConfigStore={appConfigStore}>
				<FetcherProvider
					withFake
					reqConf={{domain: "", token: "", timeout, logger}}
				>
					{children}
				</FetcherProvider>
			</ConfigProvider>
		))
		.exhaustive()
}
