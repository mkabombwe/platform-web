import { Box, Loader } from '@mantine/core'

export default function LoadingScreen() {
	return (
		<Box
			sx={{
				right: 0,
				bottom: 0,
				zIndex: 99999,
				width: '100%',
				height: '100%',
				position: 'fixed',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			<Loader size='xl' variant='dots' />
		</Box>
	)
}
