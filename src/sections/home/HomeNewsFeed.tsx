import { Group } from '@mantine/core'
import { collection, DocumentData, onSnapshot, orderBy,query } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import Post from '../../components/Post'
import PostCreator from '../../components/PostCreator'
import { DB } from '../../utils/config'

export default function HomeNewsFeed() {
	const [posts, setPosts] = useState<DocumentData>()

	useEffect(() => {
		const q = query(collection(DB, 'posts'), orderBy('createdAt', 'desc'))
		const unsubscribe = onSnapshot(q, (snapshot) => {
			const data: DocumentData[] = []
			snapshot.forEach((doc) => {
				data.push({ ...doc.data(), id: doc.id })
			})
			setPosts(data)
		})
		return () => unsubscribe()
	}, [])

	return (
		<Group direction='column'>
			<PostCreator />
			{posts && posts.map((post: DocumentData) => <Post key={post.id} post={post} />)}
		</Group>
	)
}
