import { Navigate } from 'react-router-dom'

// Hooks
import useAuth from '../hooks/useAuth'
// Interfaces
import ChildrenInterface from '../interfaces/children'

export default function GuestGuard({ children }: ChildrenInterface) {
	const { isAuthenticated } = useAuth()

	if (isAuthenticated) {
		return <Navigate to={'/'} />
	}

	return children
}
