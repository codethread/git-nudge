import {type Netrc, parseNetrc} from "./netrc"
import {
	type IConfig,
	StorageConfigSchema,
	configContext,
	createConfigStore,
} from "./useConfig"
import {Button} from "@/components/ui/button"
import {useRef, useState} from "react"
import {P, match} from "ts-pattern"

export const ConfigProvider = ({children, netrcStr, initConfig}: Props) => {
	const stored = StorageConfigSchema.parse(initConfig)
	const config = parseNetrc(netrcStr)
	const [chosen, setChosen] = useState<IConfig["gitlab"]>()

	return match([config, chosen])
		.with([{tag: "invalid", err: P.select()}, P._], (err) => <p>{err}</p>)
		.with([{tag: "multiple"}, P.nullish], ([{netrc}]) => (
			<ChooseNetrc onSelect={setChosen} netrc={netrc} />
		))
		.with([{tag: "multiple"}, P.select(P.nonNullable)], (gitlab) => (
			<Provider config={{...stored, gitlab}}>{children}</Provider>
		))
		.with([{tag: "valid", netrc: P.select()}, P._], ({domain, pass, user}) => (
			<Provider config={{...stored, gitlab: {domain, user, token: pass}}}>
				{children}
			</Provider>
		))
		.exhaustive()
}

function ChooseNetrc({
	netrc,
	onSelect,
}: {
	netrc: Netrc
	onSelect: (conf: IConfig["gitlab"]) => void
}) {
	const configs = Object.entries(netrc)
	return (
		<div>
			<p>You have multiple machine configs, which will you use for gitlab?</p>
			{configs.map(([domain, {login, password}]) => (
				<div key={domain}>
					<Button
						onClick={() => {
							onSelect({user: login, domain, token: password})
						}}
					>
						{domain} {login}
					</Button>
				</div>
			))}
		</div>
	)
}

function Provider({children, config}: IChildren & {config: IConfig}) {
	const store = useRef(createConfigStore(config)).current

	return (
		<configContext.Provider value={store}>{children}</configContext.Provider>
	)
}

interface Props extends IChildren {
	netrcStr: string
	initConfig: unknown
}
