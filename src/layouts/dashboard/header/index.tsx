import {
	ActionIcon,
	Avatar,
	Burger,
	createStyles,
	Group,
	Header,
	MediaQuery,
	useMantineColorScheme,
	useMantineTheme
} from '@mantine/core'
import Iconify from '../../../components/Iconify'

const useStyles = createStyles((theme) => ({
	header: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: theme.spacing.sm,
		backgroundColor: theme.colors[theme.primaryColor][6]
	},
	avatar: {
		cursor: 'pointer'
	}
}))

export default function NavigationHeader({ open, setOpen }: { open: boolean; setOpen: Function }) {
	const { toggleColorScheme } = useMantineColorScheme()
	const theme = useMantineTheme()
	const { classes } = useStyles()

	return (
		<Header height={80} p='md' className={classes.header}>
			<MediaQuery largerThan='md' styles={{ display: 'none' }}>
				<Burger
					opened={open}
					onClick={() => setOpen((o: boolean) => !o)}
					size='sm'
					color='white'
					mr='md'
				/>
			</MediaQuery>

			<Group position='apart' sx={{ flexGrow: 1 }}>
				<h1>Platform</h1>
				<Group>
					<Avatar src={null} alt='user' radius='xl' className={classes.avatar}></Avatar>
					<ActionIcon onClick={() => toggleColorScheme()} size='lg' variant='filled' radius='lg'>
						<Iconify
							icon={
								theme.colorScheme === 'dark'
									? 'fluent:lightbulb-filament-24-filled'
									: 'fluent:lightbulb-20-regular'
							}
							color='white'
						/>
					</ActionIcon>
				</Group>
			</Group>
		</Header>
	)
}
