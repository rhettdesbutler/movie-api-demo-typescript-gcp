import { MagicMovie, MagicMovieResponse } from './interfaces'

export const responseHandler = (
	data: MagicMovie[] | undefined,
	error?: string
): {
	status: number
	response: MagicMovieResponse
} => {
	let status = 200
	let response: MagicMovieResponse
	if (data) {
		response = {
			magicMovies: {
				totalRecords: data.length,
				recordsFetched: data.length,
				data: data,
			},
		}
	} else {
		status = 500
		response = {
			magicMovies: {
				totalRecords: 0,
				recordsFetched: 0,
				data: [],
				error: `Failed to retrieve movie(s) data, internal DB error: ${error}`,
			},
		}
	}
	return {
		status: status,
		response: response,
	}
}
