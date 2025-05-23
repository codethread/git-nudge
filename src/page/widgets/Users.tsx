import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Button} from "@/components/ui/button"
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
import {useConfigSelector} from "@/hooks/config/useConfig"
import {type IUser, useUsersQuery} from "@/hooks/users/useUsers"
import {cn} from "@/lib/utils"
import {RefreshCw} from "lucide-react"
import {P, match} from "ts-pattern"

interface UserProps {
	className?: string
	loading?: boolean
	user?: IUser
}

export function User(props: UserProps) {
	const domain = useConfigSelector((s) => s.gitlab.domain)

	const user = match(props)
		.with({loading: true}, () => undefined)
		.with({user: P.select()}, (_) => _)
		.exhaustive()

	const avatar = user?.avatarUrl?.replace(/^\//, `https://${domain}/`)

	return (
		<div className={cn("flex items-center space-x-4", props.className)}>
			{user?.avatarUrl ? (
				<Avatar className="hover:outline-accent-foreground h-10 w-10 outline outline-offset-1 transition hover:outline-2">
					<AvatarImage src={avatar} />
					<AvatarFallback className="text-xl">
						{user.username.slice(0, 2)}
					</AvatarFallback>
				</Avatar>
			) : (
				<Skeleton className="h-10 w-10 rounded-full" />
			)}
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
	)
}

export function Users() {
	const {isFetching, error, allUsers, refetch} = useUsersQuery()

	if (error) {
		return <div>{error.message}</div>
	}

	return (
		<Table>
			<TableCaption>Users in this GitLab instance</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Avatar</TableHead>
					<TableHead className="w-[100px]">Name</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Username</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{allUsers.map((user) => (
					<TableRow key={user.username}>
						<TableCell>
							<Avatar className="h-6 w-6 outline outline-offset-1">
								<AvatarImage src={user.avatarUrl} />
								<AvatarFallback className="text-xl">
									{user.username.slice(0, 2)}
								</AvatarFallback>
							</Avatar>
						</TableCell>
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
					<TableCell>
						<Button variant={"outline"} size="iconSm" onClick={() => refetch()}>
							<RefreshCw className={isFetching ? "animate-spin" : ""} />
						</Button>
					</TableCell>
					<TableCell className="text-right">{allUsers.length}</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	)
}
