import {
	Anchor,
	Button,
	Container,
	Paper,
	PasswordInput,
	Text,
	TextInput,
	Title
} from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'

import useAuth from '../../hooks/useAuth'
import { PATH_AUTH } from '../../routes/paths'

export default function Register() {
	const { register } = useAuth()

	const schema = Yup.object().shape({
		email: Yup.string().email('Email must be a valid email address').required('Email is required'),
		password: Yup.string().required('Password is required')
	})

	const defaultValues = {
		email: '',
		password: ''
	}

	const form = useForm({
		schema: yupResolver(schema),
		initialValues: defaultValues
	})

	const handleSubmit = async (values: typeof form.values) => {
		form.clearErrors()
		try {
			await register(values.email, values.password)
		} catch (error: any) {
			console.error(error.message)
			form.setFieldError('email', error.message)
		}
	}

	return (
		<Container size={420} my={40}>
			<form onSubmit={form.onSubmit(handleSubmit)}>
				<Title
					align='center'
					sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
				>
					Create an account
				</Title>
				<Text color='dimmed' size='sm' align='center' mt={5}>
					Already a memeber?{' '}
					<Anchor component={Link} size='sm' to={PATH_AUTH.register}>
						Login
					</Anchor>
				</Text>

				<Paper withBorder shadow='md' p={30} mt={30} radius='md'>
					<TextInput
						label='Email'
						placeholder='your@email.com'
						required
						{...form.getInputProps('email')}
					/>
					<PasswordInput
						label='Password'
						placeholder='Your password'
						required
						mt='md'
						{...form.getInputProps('password')}
					/>

					<Button fullWidth mt='xl' type='submit'>
						Register
					</Button>
				</Paper>
			</form>
		</Container>
	)
}
