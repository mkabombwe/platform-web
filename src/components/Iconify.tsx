import { Icon } from '@iconify/react'
import { Box } from '@mantine/core'

export default function Iconify({ icon, ...other }) {
	return <Box component={Icon} icon={icon} {...other} />
}
