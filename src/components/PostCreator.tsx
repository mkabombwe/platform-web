import { Button, Card, Group, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import useAuth from '../hooks/useAuth'
import { DB } from '../utils/config'

export default function PostCreator() {
	const { user } = useAuth()
	const form = useForm({
		initialValues: {
			text: ''
		}
	})

	const handleSubmit = async (value: typeof form.values) => {
		try {
			await addDoc(collection(DB, 'posts'), {
				text: value.text,
				user: {
					uid: user?.uid,
					photoURL: user?.photoURL,
					displayName: user?.displayName
				},
				createdAt: serverTimestamp()
			})
			form.reset()
		} catch (error: any) {
			console.error(error)
			form.setFieldError('text', error?.message)
		}
	}
	return (
		<Card
			shadow='sm'
			sx={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center'
			}}
			component='form'
			onSubmit={form.onSubmit(handleSubmit)}
		>
			<Textarea
				placeholder="What's happening?"
				minRows={4}
				autosize
				radius='md'
				{...form.getInputProps('text')}
			/>
			<Group position='right' mt='md'>
				<Button type='submit' radius='md'>
					Submit
				</Button>
			</Group>
		</Card>
	)
}
