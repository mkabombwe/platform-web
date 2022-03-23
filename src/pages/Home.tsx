import { Grid } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

import { HomeNewsFeed, HomeWidgets } from '../sections/home'

export default function Home() {
	const smallScreen = useMediaQuery('(max-width: 900px)')
	const mediumScreen = useMediaQuery('(max-width: 1200px)')

	return (
		<Grid gutter='xl'>
			<Grid.Col md={4} lg={3} sx={{ display: smallScreen ? 'none' : 'initial' }}>
				<HomeWidgets />
			</Grid.Col>
			<Grid.Col xs={12} md={8} lg={6}>
				<HomeNewsFeed />
			</Grid.Col>
			<Grid.Col lg={3} sx={{ display: mediumScreen ? 'none' : 'initial' }}>
				<HomeWidgets />
			</Grid.Col>
		</Grid>
	)
}
