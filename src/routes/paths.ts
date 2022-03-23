function path(root: string, sublink: string) {
	return `${root}${sublink}`
}

const ROOTS_AUTH = '/session'
export const PATH_AUTH = {
	root: ROOTS_AUTH,
	login: path(ROOTS_AUTH, '/login'),
	register: path(ROOTS_AUTH, '/register')
}
