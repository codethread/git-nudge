import {Card, CardHeader, CardTitle} from '@/components/ui/card';
import {Lead} from '@/components/ui/text';
import {UsersPreview, useUsersQuery} from './widgets/Users';

export function Dashboard() {
	const {error, isFetching, users, progress, allFetched} = useUsersQuery();
	return (
		<div>
			<Lead>Welcome, getting things set up...</Lead>
			<div>
				<Card>
					<CardHeader>
						<CardTitle>
							<Lead>{!allFetched ? 'Loading users' : 'Users'}</Lead>
						</CardTitle>
						<UsersPreview loading={!allFetched} users={users} />
					</CardHeader>
				</Card>
			</div>
		</div>
	);
}
