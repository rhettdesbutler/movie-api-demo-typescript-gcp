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
