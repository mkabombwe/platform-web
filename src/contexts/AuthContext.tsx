/*eslint no-unused-vars: "off"*/
// Firebase
import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile
} from 'firebase/auth'
import { collection, doc, DocumentData, onSnapshot, setDoc } from 'firebase/firestore'
import { createContext, useEffect, useReducer, useState } from 'react'

// Interfaces
import AuthStateInterface from '../interfaces/authState'
import ChildrenInterface from '../interfaces/children'
// Config
import { AUTH, DB } from '../utils/config'

const initialState: AuthStateInterface = {
	isAuthenticated: false,
	isInitialized: false,
	user: undefined
}

const reducer = (state: any, action: any) => {
	if (action.type === 'INITIALISE') {
		const { isAuthenticated, user } = action.payload
		return {
			...state,
			isAuthenticated,
			isInitialized: true,
			user
		}
	}

	return state
}

const AuthContext = createContext({
	...initialState,
	login: (email: string, password: string) => Promise.resolve(),
	loginWithGoogle: () => Promise.resolve(),
	register: (email: string, password: string) => Promise.resolve(),
	logout: () => Promise.resolve()
})

let unsub: any = null

function AuthProvider({ children }: ChildrenInterface) {
	const [state, dispatch] = useReducer(reducer, initialState)
	const [profile, setProfile] = useState<DocumentData>()

	useEffect(
		() =>
			onAuthStateChanged(AUTH, async (user) => {
				if (user) {
					const userRef = doc(DB, 'users', user.uid)

					unsub = onSnapshot(userRef, (doc) => {
						if (doc.exists()) {
							setProfile(doc.data())
						}
					})
					dispatch({
						type: 'INITIALISE',
						payload: { isAuthenticated: true, user }
					})
				} else {
					dispatch({
						type: 'INITIALISE',
						payload: { isAuthenticated: false, user: null }
					})
				}
			}),
		[dispatch]
	)

	const login = (email: string, password: string) =>
		signInWithEmailAndPassword(AUTH, email, password)

	const loginWithGoogle = () => {
		const provider = new GoogleAuthProvider()
		return signInWithPopup(AUTH, provider)
	}

	const register = (email: string, password: string) =>
		createUserWithEmailAndPassword(AUTH, email, password).then(async (res) => {
			const userRef = doc(collection(DB, 'users'), res.user?.uid)
			const tempDisplayName = email.split('@')
			const displayName = tempDisplayName[0]

			await updateProfile(res.user, {
				displayName,
				photoURL: 'profileimages/default.png'
			})

			await setDoc(userRef, {
				email,
				role: 'user',
				about: '',
				coverURL: 'profilecovers/default.jpg'
			})
		})

	const logout = () => {
		signOut(AUTH)
		unsub()
	}

	return (
		<AuthContext.Provider
			value={{
				...state,
				user: {
					id: state?.user?.uid,
					email: state?.user?.email,
					displayName: state?.user?.displayName,
					photoURL: state?.user?.photoURL,
					coverURL: profile?.coverURL,
					role: profile?.role,
					about: profile?.about
				},
				login,
				loginWithGoogle,
				register,
				logout
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthContext, AuthProvider }
