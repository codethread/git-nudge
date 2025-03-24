import {Skeleton} from "@/components/ui/skeleton"
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import {Text, TextSkeleton} from "@/components/ui/text"
import {useConfigRequest} from "@/hooks/config/useConfig"
import {type IUser, useUsersQuery} from "@/hooks/useUsers"
import {cn} from "@/lib/utils"
import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar"
import {P, match} from "ts-pattern"

interface UserProps {
	className?: string
	loading?: boolean
	user?: IUser
}

export function User(props: UserProps) {
	const {domain} = useConfigRequest()

	const user = match(props)
		.with({loading: true}, () => undefined)
		.with({user: P.select()}, (_) => _)
		.exhaustive()

	const avatar = user?.avatarUrl?.replace(/^\//, `https://${domain}/`)

	return (
		<div className={cn("flex items-center space-x-4", props.className)}>
			{user?.avatarUrl ? (
				<Avatar className="flex h-10 w-10 items-center justify-center overflow-clip rounded-full outline transition hover:outline-2 hover:outline-pink-500">
					<AvatarImage src={avatar} />
					<AvatarFallback className="text-xl">
						{user.username.slice(0, 2)}
					</AvatarFallback>
				</Avatar>
			) : (
				<Skeleton className="h-10 w-10 rounded-full" />
			)}
			<div className="space-y-2">
				{user ? (
					<div>
						<Text flush>{user.name}</Text>
						<div className="flex">
							<Text flush>
								<span className="text-muted-foreground">{user.state}</span>
								{user.username === user.name ? "" : ` ${user.username}`}
							</Text>
						</div>
					</div>
				) : (
					<div>
						<TextSkeleton className="w-[100px]" />
						<TextSkeleton className="w-[100px]" />
					</div>
				)}
			</div>
		</div>
	)
}

export function Users() {
	const {isFetching, error, users} = useUsersQuery()

	if (error) {
		return <div>{error.message}</div>
	}

	return (
		<Table>
			<TableCaption>Users in this GitLab instance</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Name</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Username</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{users.map((user) => (
					<TableRow key={user.username}>
						<TableCell className="font-medium">
							<a
								className="text-blue-400 underline"
								href={user.webUrl}
								target="_blank"
								rel="noreferrer"
							>
								{user.name}
							</a>
						</TableCell>
						<TableCell>{user.state}</TableCell>
						<TableCell>{user.username}</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell>Total</TableCell>
					<TableCell>{isFetching ? "fetching..." : ""}</TableCell>
					<TableCell className="text-right">{users.length}</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	)
}
