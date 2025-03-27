import {ConfigProvider} from "@/hooks/config/ConfigProvider"
import {useAppConfigSelector, useAppConfigStore} from "@/hooks/config/useConfig"
import {FetcherProvider} from "@/hooks/fetcher/FetcherProvider"
import {useNav} from "@/hooks/useNav"
import {Dashboard} from "@/page/Dashboard"
import Layout from "@/page/Layout"
import {Login} from "@/page/Login"
import {match} from "ts-pattern"

export function PageManager() {
	const {page, nav} = useNav()
	const appConfigStore = useAppConfigStore()
	const isFakeLab = useAppConfigSelector((s) => s.fakeLab)
	const gitlabConf = useAppConfigSelector((s) => s.gitlab)
	const timeout = useAppConfigSelector((s) => s.global.requestTimeoutMillis)

	return match({isFakeLab, gitlabConf})
		.with({isFakeLab: false, gitlabConf: {state: "init"}}, () => (
			<Layout>
				<Login />
			</Layout>
		))
		.with(
			{isFakeLab: false, gitlabConf: {state: "ready"}},
			({gitlabConf: {domain, token}}) => (
				<ConfigProvider appConfigStore={appConfigStore}>
					<FetcherProvider reqConf={{domain, token, timeout}}>
						<Dashboard />
					</FetcherProvider>
				</ConfigProvider>
			),
		)
		.with({isFakeLab: true}, () => (
			<ConfigProvider appConfigStore={appConfigStore}>
				<FetcherProvider withFake reqConf={{domain: "", token: "", timeout}}>
					<Dashboard />
				</FetcherProvider>
			</ConfigProvider>
		))
		.exhaustive()
}
