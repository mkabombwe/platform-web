import { Grid, Group, MediaQuery } from '@mantine/core'

import { HomeUserCardWidget } from '.'

export default function HomeWidgets() {
	return (
		// <MediaQuery smallerThan='md' styles={{ display: 'none' }}>

		<Group direction='column'>
			<HomeUserCardWidget />
		</Group>

		// </MediaQuery>
	)
}
