import {Skeleton} from "./skeleton"
import {cn} from "@/lib/utils"
import {type VariantProps, cva} from "class-variance-authority"

const textVariants = cva("", {
	variants: {
		variant: {
			default: "",
		},
		flush: {
			false: "[&:not(:first-child)]:mt-md leading-6",
			true: null,
		},
	},
	defaultVariants: {
		variant: "default",
		flush: false,
	},
})

export function Text({
	className,
	variant,
	flush,
	...props
}: React.ComponentProps<"p"> & VariantProps<typeof textVariants>) {
	return (
		<p className={cn(textVariants({variant, className, flush}))} {...props} />
	)
}

export function Lead({className, ...props}: React.ComponentProps<"p">) {
	return (
		<p className={cn("text-muted-foreground text-xl", className)} {...props} />
	)
}

export function TextSkeleton({className}: {className?: string}) {
	// TODO: there must be a var for this
	return (
		<div className="flex h-[calc(var(--text-base)*1.5)] flex-col justify-center">
			<Skeleton className={cn("h-(--text-base) w-[250px]", className)} />
		</div>
	)
}
