import {RouteProviders} from "@/components/RouteProviders"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Button} from "@/components/ui/button"
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
import {useUsersQuery} from "@/hooks/users/useUsers"
import {createFileRoute} from "@tanstack/react-router"
import {RefreshCw} from "lucide-react"

function UsersTable() {
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

function UsersComponent() {
	return (
		<RouteProviders>
			<UsersTable />
		</RouteProviders>
	)
}

export const Route = createFileRoute("/users")({
	component: UsersComponent,
})
