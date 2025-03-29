import {Alert, AlertTitle, AlertDescription} from "@/components/ui/alert"
import {parseError} from "@/lib/utils"
import {Terminal} from "lucide-react"
import {
	ErrorBoundary as ReactErrorBoundary,
	type FallbackProps,
} from "react-error-boundary"

export function ErrorBoundary({children}: IChildren) {
	return (
		<ReactErrorBoundary FallbackComponent={ErrorComp}>
			{children}
		</ReactErrorBoundary>
	)
}

function ErrorComp({error}: FallbackProps) {
	const info = parseError(error)
	return (
		<div className="m-md">
			<Alert>
				<AlertTitle className="gap-sm flex items-end text-xl text-red-400">
					<Terminal className="stroke-red-400" />
					Blimey!
				</AlertTitle>
				<AlertDescription className="my-sm">
					<pre className="w-full overflow-x-scroll">{info}</pre>
				</AlertDescription>
			</Alert>
		</div>
	)
}
