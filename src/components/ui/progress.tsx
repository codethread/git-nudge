import {cn} from "@/lib/utils"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import type * as React from "react"

function Progress({
	className,
	value,
	...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
	return (
		<ProgressPrimitive.Root
			data-slot="progress"
			className={cn(
				"bg-primary/10 relative h-2 w-full overflow-hidden rounded-full",
				className,
			)}
			{...props}
		>
			<ProgressPrimitive.Indicator
				data-slot="progress-indicator"
				className="bg-accent-foreground/80 h-full w-full flex-1 rounded-full transition-all"
				style={{transform: `translateX(-${100 - (value || 0)}%)`}}
			/>
		</ProgressPrimitive.Root>
	)
}

export {Progress}
