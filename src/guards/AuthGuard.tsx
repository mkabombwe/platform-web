import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import LoadingScreen from '../components/LoadingScreen'
// Hooks
import useAuth from '../hooks/useAuth'
// Interfaces
import ChildrenInterface from '../interfaces/children'
import { PATH_AUTH } from '../routes/paths'

export default function AuthGuard({ children }: ChildrenInterface) {
	const { isAuthenticated, isInitialized } = useAuth()
	const { pathname } = useLocation()
	const [requestedLocation, setRequestedLocation] = useState<string>()

	if (!isInitialized) {
		return <LoadingScreen />
	}

	if (!isAuthenticated) {
		return <Navigate to={PATH_AUTH.login} />
	}

	if (requestedLocation && pathname !== requestedLocation) {
		setRequestedLocation(undefined)
		return <Navigate to={requestedLocation} />
	}

	return children
}
