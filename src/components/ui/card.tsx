import {cn} from "@/lib/utils"
import type * as React from "react"

function Card({className, ...props}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card"
			className={cn(
				"bg-card text-card-foreground gap-md py-md flex flex-col rounded-xl border shadow-sm",
				className,
			)}
			{...props}
		/>
	)
}

function CardHeader({className, ...props}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-header"
			className={cn(
				"gap-sm px-md [.border-b]:pb-md @container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start has-[data-slot=card-action]:grid-cols-[1fr_auto]",
				className,
			)}
			{...props}
		/>
	)
}

function CardTitle({className, ...props}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-title"
			className={cn("leading-none font-semibold", className)}
			{...props}
		/>
	)
}

function CardDescription({className, ...props}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-description"
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	)
}

function CardAction({className, ...props}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-action"
			className={cn(
				"col-start-2 row-span-2 row-start-1 self-start justify-self-end",
				className,
			)}
			{...props}
		/>
	)
}

function CardContent({className, ...props}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-content"
			className={cn("px-md", className)}
			{...props}
		/>
	)
}

function CardFooter({className, ...props}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-footer"
			className={cn("px-md [.border-t]:pt-md flex items-center", className)}
			{...props}
		/>
	)
}

export {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardAction,
	CardDescription,
	CardContent,
}
