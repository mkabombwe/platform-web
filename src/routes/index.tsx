import { lazy, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'

import LoadingScreen from '../components/LoadingScreen'
import AuthGuard from '../guards/AuthGuard'
import GuestGuard from '../guards/GuestGuard'
import DashboardLayout from '../layouts/dashboard'

function Loadable(Component: any) {
	return function ToLoad(props: any) {
		return (
			<Suspense fallback={<LoadingScreen />}>
				<Component {...props} />
			</Suspense>
		)
	}
}

export default function Router() {
	return useRoutes([
		// Auth routes
		{
			path: 'session',
			children: [
				{
					path: 'login',
					element: (
						<GuestGuard>
							<Login />
						</GuestGuard>
					)
				},
				{
					path: 'register',
					element: (
						<GuestGuard>
							<Register />
						</GuestGuard>
					)
				}
			]
		},
		// Main routes
		{
			path: '/',
			element: (
				<AuthGuard>
					<DashboardLayout />
				</AuthGuard>
			),
			children: [
				{
					element: <Home />,
					index: true
				}
			]
		}
	])
}

const Login = Loadable(lazy(() => import('../pages/auth/Login')))
const Register = Loadable(lazy(() => import('../pages/auth/Register')))
const Home = Loadable(lazy(() => import('../pages/Home')))
