import {
	Anchor,
	Button,
	Checkbox,
	Container,
	Group,
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

export default function Login() {
	const { login } = useAuth()

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
			await login(values.email, values.password)
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
					Welcome back!
				</Title>
				<Text color='dimmed' size='sm' align='center' mt={5}>
					Do not have an account yet?{' '}
					<Anchor component={Link} size='sm' to={PATH_AUTH.register}>
						Create account
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
					<Group position='apart' mt='md'>
						<Checkbox label='Remember me' />
						<Anchor<'a'> onClick={(event) => event.preventDefault()} href='#' size='sm'>
							Forgot password?
						</Anchor>
					</Group>
					<Button fullWidth mt='xl' type='submit'>
						Sign in
					</Button>
				</Paper>
			</form>
		</Container>
	)
}
