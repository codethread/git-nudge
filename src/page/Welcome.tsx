import {Button} from "@/components/ui/button"
import {Lead} from "@/components/ui/text"
import {MyCard, ReposCard, UsersCard} from "@/page/welcome/WelcomeCards"
import {useNavigate} from "@tanstack/react-router"
import {useState, useCallback} from "react"

export default function Welcome() {
	const navigate = useNavigate()
	const [ready, setReady] = useState<boolean[]>([])
	const allReady = ready.every(Boolean) && ready.length > 2
	const onSuccess = useCallback(() => setReady((s) => s.concat(true)), [])
	return (
		<div className="@container w-[100%] flex-1">
			<div className="flex h-24 flex-col justify-center">
				{allReady ? (
					<div className="animate-fade flex justify-center">
						<Button
							size="lg"
							ping
							variant="outline"
							onClick={() => navigate({to: "/"})}
						>
							Launch
						</Button>
					</div>
				) : (
					<Lead className="animate-fade text-center">
						Welcome, getting things set up...
					</Lead>
				)}
			</div>
			<div className="gap-sm @min-5xl:gap-lg flex flex-wrap items-stretch justify-center">
				<MyCard onSuccess={onSuccess} />
				<UsersCard onSuccess={onSuccess} />
				<ReposCard onSuccess={onSuccess} />
			</div>
		</div>
	)
}
