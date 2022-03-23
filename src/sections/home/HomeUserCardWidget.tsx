import { Avatar, Box, Button, Card, Divider, Image, Text } from '@mantine/core'
import { getDownloadURL, ref } from 'firebase/storage'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'
import { STORAGE } from '../../utils/config'

export default function HomeUserCardWidget() {
	const { user } = useAuth()
	const [profileImage, setProfileImage] = useState<string>()
	const [coverImage, setCoverImage] = useState<string>()

	useEffect(() => {
		if (user?.photoURL) {
			async function getUrl() {
				try {
					const photoURL = user?.photoURL as string
					const url = await getDownloadURL(ref(STORAGE, photoURL))
					setProfileImage(url)
				} catch (error) {
					console.error(error)
				}
			}
			getUrl()
		}
	}, [user?.photoURL])

	useEffect(() => {
		if (user?.coverURL) {
			async function getUrl() {
				try {
					const coverURL = user?.coverURL as string
					const url = await getDownloadURL(ref(STORAGE, coverURL))
					setCoverImage(url)
				} catch (error) {
					console.error(error)
				}
			}
			getUrl()
		}
	}, [user?.coverURL])

	return (
		<Card
			shadow='sm'
			sx={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center'
			}}
		>
			<Card.Section sx={{ flex: 1 }}>
				<Image sx={{ width: '100%' }} height={120} src={coverImage} />
			</Card.Section>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'
				}}
			>
				<Avatar
					src={profileImage}
					size={100}
					sx={{
						borderRadius: '100%',
						position: 'absolute',
						top: '65px'
					}}
				/>

				<Box mt={60}>
					<Text align='center'>@{user?.displayName}</Text>
					<Text align='center'>{user?.about}</Text>
				</Box>
			</Box>
			<Divider my={20} />
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center'
				}}
			>
				<Button variant='subtle' component={Link} to='/' color='primary'>
					My profile
				</Button>
			</Box>
		</Card>
	)
}
