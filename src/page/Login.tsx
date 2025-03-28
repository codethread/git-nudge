import {LoaderPage} from "@/components/ui/Loader"
import {Button} from "@/components/ui/button"
import {Lead} from "@/components/ui/text"
import {useAppConfigAction} from "@/hooks/config/useAppConfig"
import {useBridge} from "@/hooks/useBridge"
import {useNavigation} from "@/hooks/useNav"
import {parseNetrc, type Netrc} from "@/lib/netrc"
import {useQuery} from "@tanstack/react-query"
import {match, P} from "ts-pattern"

export default function Login() {
	const {setLogin} = useAppConfigAction()
	const {readNetrc} = useBridge()
	const {data, isFetching, refetch} = useQuery({
		queryKey: ["netrc"],
		queryFn: async () => {
			const netrc = await readNetrc()
			const parsed = parseNetrc(netrc)
			if (parsed.tag === "valid") {
				const {
					netrc: {user, domain, pass},
				} = parsed
				setLogin({domain, user, token: pass})
				// leave it hanging but remove the union member
				return new Promise(() => {}) as never
			}
			return parsed
		},
	})

	if (!data || isFetching) return <LoaderPage />

	return match(data)
		.with({tag: "invalid", err: P.select()}, (err) => <p>{err}</p>)
		.with({tag: "multiple"}, ({netrc}) => <ChooseNetrc netrc={netrc} />)
		.with({tag: "missing"}, () => <NoNetrc onRetry={refetch} />)
		.exhaustive()
}

function NoNetrc({onRetry}: {onRetry: () => void}) {
	const {toggleFakeLab} = useAppConfigAction()
	const {nav} = useNavigation()
	return (
		<div className="flex flex-1 justify-center">
			<div className="flex flex-col">
				<Lead className="mb-lg">Missing netrc</Lead>
				<div className="gap-md flex flex-col">
					<p>
						Could not load{" "}
						<span className="bg-secondary rounded-sm p-1">~/.netrc</span> file.
						Please create one in the format:
					</p>
					<pre className="bg-secondary p-sm rounded-sm text-wrap">
						{[
							"machine <domain> # e.g git.mycompany.io",
							"login <gitlab username>",
							"password <token>",
						].join("\n")}
					</pre>
					<p>
						Where <span>{"<token>"}</span> is a gitlab access{" "}
						<a
							href="https://docs.gitlab.com/user/profile/personal_access_tokens/"
							target="_blank"
							rel="noreferrer"
						>
							token
						</a>
					</p>
					<div className="flex justify-around">
						<div className="gap-md flex">
							<Button size="lg" onClick={() => onRetry()}>
								Retry
							</Button>
							<Button
								variant="outline"
								size="lg"
								onClick={() => {
									toggleFakeLab()
									nav("welcome")
								}}
							>
								Use FakeLab
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

function ChooseNetrc({netrc}: {netrc: Netrc}) {
	const configs = Object.entries(netrc)
	const {setLogin} = useAppConfigAction()
	return (
		<div>
			<p>You have multiple machine configs, which will you use for gitlab?</p>
			{configs.map(([domain, {login, password}]) => (
				<div key={domain}>
					<Button
						onClick={() => {
							setLogin({user: login, domain, token: password})
						}}
					>
						{domain} {login}
					</Button>
				</div>
			))}
		</div>
	)
}
