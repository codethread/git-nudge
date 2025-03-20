import {Card, CardHeader, CardTitle} from '@/components/ui/card';
import {Lead} from '@/components/ui/text';
import {Users, useUsersQuery} from './widgets/Users';

export function Dashboard() {
	const {error, isFetching, users, progress} = useUsersQuery();
	return (
		<div>
			<Lead>Welcome, getting things set up...</Lead>
			<div>
				<Card>
					<CardHeader>
						<CardTitle>Loading users</CardTitle>
						<CardTitle>{progress}</CardTitle>
					</CardHeader>
				</Card>
			</div>
			<Users />
		</div>
	);
}
