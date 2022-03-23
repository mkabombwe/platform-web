import React from 'react'
import { render } from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { AuthProvider } from './contexts/AuthContext'
import { SettingsProvider } from './contexts/SettingsContext'

render(
	<React.StrictMode>
		<AuthProvider>
			<HelmetProvider>
				<SettingsProvider>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</SettingsProvider>
			</HelmetProvider>
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
