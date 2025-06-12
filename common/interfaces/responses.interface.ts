import { MagicMovie } from './magicMovie.interface'

export interface MagicMovieResponse {
	magicMovies: {
		totalRecords: number
		recordsFetched: number
		data: MagicMovie[]
		nextPage?: number
		error?: string
	}
}

export interface MagicMoviePostResponse {
	magicMovies: {
		status: number
		message: string
		error?: string
	}
}
