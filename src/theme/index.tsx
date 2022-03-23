import { ColorScheme, ColorSchemeProvider, Global, MantineProvider } from '@mantine/core'
import { useMemo } from 'react'

// Hooks
import useSettings from '../hooks/useSettings'
// Interfaces
import ChildrenInterface from '../interfaces/children'
import breakpoints from './breakpoints'
//
import palette from './palette'
import spacing from './spacing'

export default function ThemeProvider({ children }: ChildrenInterface) {
	const { themeMode, onToggleMode } = useSettings()

	const themeOptions = useMemo(
		() => ({
			colorScheme: themeMode as ColorScheme,
			colors: palette,
			primaryColor: 'brand',
			defaultRadius: 24,
			breakpoints,
			spacing
		}),
		[themeMode]
	)

	return (
		<ColorSchemeProvider colorScheme={themeOptions.colorScheme} toggleColorScheme={onToggleMode}>
			<MantineProvider withNormalizeCSS withGlobalStyles theme={themeOptions}>
				<Global
					styles={(theme) => ({
						body: {
							backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : '#FAFDFB'
						}
					})}
				/>
				{children}
			</MantineProvider>
		</ColorSchemeProvider>
	)
}
