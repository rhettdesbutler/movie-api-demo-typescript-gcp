import { MagicMovie, MagicMovieResponse } from './interfaces'

export const responseHandler = (
	data: MagicMovie[] | undefined | string,
	totalRecords: number,
	page?: number,
	error?: string
): {
	status: number
	response: MagicMovieResponse
} => {
	let status = 200
	let response: MagicMovieResponse
	if (data && typeof data !== 'string') {
		response = {
			magicMovies: {
				totalRecords: totalRecords,
				recordsFetched: data.length,
				data: data,
			},
		}

		if (page) {
			response = {
				magicMovies: {
					totalRecords: totalRecords,
					recordsFetched: data.length,
					data: data,
					nextPage: page,
				},
			}
		}
	} else if (data && typeof data === 'string') {
		status = 404
		response = {
			magicMovies: {
				totalRecords: 0,
				recordsFetched: 0,
				data: [],
				error: `No movie found: ${error}`,
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
