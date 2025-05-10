import { Request } from 'express'
import { keyExists } from './utils'

export const bodyChecker = (
	req: Request
): { status: boolean; response: string } => {
	let clientBody = req.body

	if (!clientBody) {
		return {
			status: false,
			response: `Missing client body!`,
		}
	} else {
		if (
			keyExists(clientBody, 'title') ||
			keyExists(clientBody, 'year') ||
			keyExists(clientBody, 'genre') ||
			keyExists(clientBody, 'revenue') ||
			keyExists(clientBody, 'budget') ||
			keyExists(clientBody, 'adult') ||
			keyExists(clientBody, 'popularity') ||
			keyExists(clientBody, 'language')
		) {
			if (keyExists(clientBody, 'filters')) {
				if (
					keyExists(clientBody, 'condition') &&
					keyExists(clientBody, 'value')
				) {
					return { status: true, response: 'ok' }
				} else {
					return {
						status: false,
						response: `Missing required condition and/or value parameters in the request body`,
					}
				}
			}
			return { status: true, response: 'ok' }
		} else {
			return { status: false, response: `Unpermitted values in request body!` }
		}
	}
}
