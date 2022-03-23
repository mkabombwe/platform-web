import { useEffect, useState } from 'react'
import { Avatar, Box, Card, Group, Text } from '@mantine/core'
import { DocumentData } from 'firebase/firestore'
import { getDownloadURL, ref } from 'firebase/storage'
import { STORAGE } from '../utils/config'
import { fToNow } from '../utils/formatTime'

export default function Post({ post }: { post: DocumentData }) {
	const [profileImage, setProfileImage] = useState<string>()
	const { text, user, createdAt } = post

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
	return (
		<Card shadow='sm' sx={{ width: '100%' }}>
			<Box sx={{ display: 'flex', flexDirection: 'row' }}>
				<Avatar src={profileImage} mr='md' />
				<Box>
					<Text weight='bold'>@{user.displayName}</Text>
					{createdAt && (
						<Text size='xs' color='gray'>
							{fToNow(Date.parse(createdAt.toDate()))}
						</Text>
					)}
					<Text mt={16}>{text}</Text>
				</Box>
			</Box>
		</Card>
	)
}
