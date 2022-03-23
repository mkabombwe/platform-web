import { AppShell } from '@mantine/core'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import NavigationHeader from './header'

export default function DashboardLayout() {
	const [open, setOpen] = useState(false)

	return (
		<AppShell
			navbarOffsetBreakpoint='sm'
			fixed
			header={<NavigationHeader open={open} setOpen={setOpen} />}
		>
			<Outlet />
		</AppShell>
	)
}
