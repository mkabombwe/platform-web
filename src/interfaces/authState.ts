import { User } from 'firebase/auth'

interface UserState extends User {
	coverURL: string
	about: string
}

export default interface AuthStateInterface {
	isAuthenticated: boolean
	isInitialized: boolean
	user?: UserState
}
