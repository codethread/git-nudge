import {LoaderPage} from "@/components/ui/Loader"
import {ConfigProvider} from "@/hooks/config/ConfigProvider"
import {
	useAppConfigSelector,
	useAppConfigStore,
} from "@/hooks/config/useAppConfig"
import {FetcherProvider} from "@/hooks/fetcher/FetcherProvider"
import {useBridge} from "@/hooks/useBridge"
import {Pages, useNavigation, type Page} from "@/hooks/useNav"
import React, {Suspense} from "react"
import {useEffect} from "react"
import {match} from "ts-pattern"

const DashboardPage = React.lazy(() => import("@/page/Dashboard"))
const LoginPage = React.lazy(() => import("@/page/Login"))
const WelcomePage = React.lazy(() => import("@/page/Welcome"))

export function PageManager() {
	const {page} = useNavigation()
	return match(page)
		.with(Pages.LOGIN, () => (
			<Suspense fallback={<LoaderPage />}>
				<LoginPage />
			</Suspense>
		))
		.with(Pages.DASHBOARD, () => (
			<Providers>
				<Suspense fallback={<LoaderPage />}>
					<DashboardPage />
				</Suspense>
			</Providers>
		))
		.with(Pages.WELCOME, () => (
			<Providers>
				<Suspense fallback={<LoaderPage />}>
					<WelcomePage />
				</Suspense>
			</Providers>
		))
		.exhaustive()
}

function Providers({children}: IChildren) {
	const appConfigStore = useAppConfigStore()
	const isFakeLab = useAppConfigSelector((s) => s.fakeLab)
	const gitlabConf = useAppConfigSelector((s) => s.gitlab)
	const timeout = useAppConfigSelector((s) => s.global.requestTimeoutMillis)
	const logger = useBridge().logger

	return match({isFakeLab, gitlabConf})
		.with({isFakeLab: false, gitlabConf: {state: "init"}}, () => (
			// intention here is to ensure regular pages will
			// have easy access to config that has been set. If it's
			// missing, or can't proceed the user will be forced to login
			<Redirect page="login" />
		))
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

function Redirect({page}: {page: Page}) {
	const {nav} = useNavigation()

	useEffect(() => nav(page), [page, nav])
	return null
}
