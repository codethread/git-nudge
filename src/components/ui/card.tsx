import {cn} from "@/lib/utils";
import type * as React from "react";

function Card({className, ...props}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card"
			className={cn(
				"bg-card text-card-foreground flex flex-col gap-md rounded-xl border py-md shadow-sm",
				className,
			)}
			{...props}
		/>
	);
}

function CardHeader({className, ...props}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-header"
			className={cn(
				"@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-sm px-md has-[data-slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-md",
				className,
			)}
			{...props}
		/>
	);
}

function CardTitle({className, ...props}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-title"
			className={cn("leading-none font-semibold", className)}
			{...props}
		/>
	);
}

function CardDescription({className, ...props}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-description"
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
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
	);
}

function CardContent({className, ...props}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-content"
			className={cn("px-md", className)}
			{...props}
		/>
	);
}

function CardFooter({className, ...props}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-footer"
			className={cn("flex items-center px-md [.border-t]:pt-md", className)}
			{...props}
		/>
	);
}

export {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardAction,
	CardDescription,
	CardContent,
};
