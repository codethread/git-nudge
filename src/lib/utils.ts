import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function throwError(e: unknown): never {
	if (typeof e === "string") throw new Error(e);
	if (e instanceof Error) throw e;
	throw new Error(JSON.stringify(e));
}
