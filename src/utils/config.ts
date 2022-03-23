import { FirebaseOptions, initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

import SettingsInterface from '../interfaces/settings'
// Firebase
const FIREBASE_API = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID
}

const firebaseApp = initializeApp(FIREBASE_API as FirebaseOptions)
export const AUTH = getAuth(firebaseApp)
export const DB = getFirestore(firebaseApp)
export const STORAGE = getStorage(firebaseApp)

if (import.meta.env.DEV) {
	connectAuthEmulator(AUTH, 'http://localhost:9099')
	connectFirestoreEmulator(DB, 'localhost', 8080)
}

// Default
export const DEFAULT_SETTINGS: SettingsInterface = {
	themeMode: 'light'
}
