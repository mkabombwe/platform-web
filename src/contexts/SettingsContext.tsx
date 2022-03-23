import { useColorScheme } from '@mantine/hooks'
import { ChangeEvent, createContext, useEffect } from 'react'

// Hooks
import useStorage from '../hooks/useStorage'
import ChildrenInterface from '../interfaces/children'

const initialState = {
	themeMode: 'light',
	onToggleMode: () => {}
}

const SettingsContext = createContext(initialState)

function SettingsProvider({ children }: ChildrenInterface) {
	const colorScheme = useColorScheme()
	const [settings, setSettings] = useStorage('settings', {
		themeMode: initialState.themeMode
	})

	const onToggleMode = () => {
		setSettings({
			...settings,
			themeMode: settings.themeMode === 'light' ? 'dark' : 'light'
		})
	}

	useEffect(() => {
		setSettings({
			...settings,
			themeMode: colorScheme
		})
	}, [colorScheme])

	return (
		<SettingsContext.Provider value={{ ...settings, onToggleMode }}>
			{children}
		</SettingsContext.Provider>
	)
}

export { SettingsContext, SettingsProvider }
