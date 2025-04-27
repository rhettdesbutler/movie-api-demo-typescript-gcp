import pino from 'pino'

const severity = (label: string) => {
	switch (label) {
		case 'trace':
			return 'DEBUG'
		case 'debug':
			return 'DEBUG'
		case 'info':
			return 'INFO'
		case 'warn':
			return 'WARNING'
		case 'error':
			return 'ERROR'
		case 'fatal':
			return 'CRITICAL'
		default:
			return 'DEFAULT'
	}
}

const level = (label: string) => {
	return { severity: severity(label) }
}

export const logger = pino({
	formatters: {
		level,
	},
	base: null,
	timestamp: false,
	level: process.env.DEBUG === 'false' ? 'debug' : 'info',
})
