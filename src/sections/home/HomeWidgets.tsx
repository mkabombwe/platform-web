import { Grid, Group, MediaQuery } from '@mantine/core'

import { HomeUserCardWidget } from '.'

export default function HomeWidgets() {
	return (
		<MediaQuery smallerThan='md' styles={{ display: 'none' }}>
			<Grid.Col span={3}>
				<Group direction='column' mr='xl'>
					<HomeUserCardWidget />
				</Group>
			</Grid.Col>
		</MediaQuery>
	)
}
