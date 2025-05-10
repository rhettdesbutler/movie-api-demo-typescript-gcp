import { Knex } from 'knex'
import { logger } from '../../common/logger'
import { MagicMovie } from '../../common/interfaces'
import { applyFiltering } from '../function'

export class GetMagicMoviesController {
	public async getMovie(
		connection: Knex,
		table: string,
		filters: any
	): Promise<{ data: MagicMovie[] | undefined; message: any }> {
		logger.info({
			msg: `Attempting to retrieve movie: ${JSON.stringify(filters)}`,
		})

		const query: string = `select * from ${table} where title LIKE '%${filters}%' limit 1`

		try {
			let results: any[] = await applyFiltering(
				connection,
				String(process.env.DB_MOVIES_TABLE),
				filters
			)

			console.log('DB results', results)

			if (results && results.length > 0) {
				let movies: MagicMovie[] = []
				results.forEach((movie) => {
					movies.push({
						id: Number(movie.id),
						title: movie.title,
						voteAverage: movie.vote_average,
						voteCount: movie.vote_count,
						status: movie.status,
						releaseDate: movie.release_date,
						revenue: movie.revenue,
						runtime: movie.runtime,
						adult: movie.adult,
						backdropPath: movie.backdrop_path,
						budget: movie.budget,
						homepage: movie.homepage,
						imdbId: movie.imdb_id,
						originalLanguage: movie.original_language,
						originalTitle: movie.original_title,
						overview: movie.overview,
						popularity: movie.popularity,
						posterPath: movie.poster_path,
						tagline: movie.tagline,
						genres: movie.genres,
						productionCompanies: movie.production_companies,
						productionCountries: movie.production_countries,
						spokenLanguages: movie.spoken_languages,
						keywords: movie.keywords,
						insertDate: movie.insertdate,
						updateDate: movie.updatedate,
					})
				})

				return {
					data: movies,
					message: 'success',
				}
			} else {
				logger.info(`No movie found: ${results}`)
				return {
					data: [],
					message: 'success',
				}
			}
		} catch (error) {
			logger.error(
				`Failed to retrieve movie with the name: ${filters}, error: ${error}`
			)
			return { data: undefined, message: error }
		}
	}

	public async getMovies(
		connection: Knex,
		table: string,
		filters: string
	): Promise<{ data: MagicMovie[] | undefined; message: any }> {
		logger.info({ msg: `Attempting to retrieve movie: ${filters}` })

		const query: string = `select * from ${table} where title LIKE '%${filters}%' limit 1`

		try {
			let results = await connection.raw(query)

			if (results && results.rows.length > 0) {
				return {
					data: [
						{
							id: results.rows[0].id,
							title: results.rows[0].title,
							voteAverage: results.rows[0].vote_average,
							voteCount: results.rows[0].vote_count,
							status: results.rows[0].status,
							releaseDate: results.rows[0].release_date,
							revenue: results.rows[0].revenue,
							runtime: results.rows[0].runtime,
							adult: results.rows[0].adult,
							backdropPath: results.rows[0].backdrop_path,
							budget: results.rows[0].budget,
							homepage: results.rows[0].homepage,
							imdbId: results.rows[0].imdb_id,
							originalLanguage: results.rows[0].original_language,
							originalTitle: results.rows[0].original_title,
							overview: results.rows[0].overview,
							popularity: results.rows[0].popularity,
							posterPath: results.rows[0].poster_path,
							tagline: results.rows[0].tagline,
							genres: results.rows[0].genres,
							productionCompanies: results.rows[0].production_companies,
							productionCountries: results.rows[0].production_countries,
							spokenLanguages: results.rows[0].spoken_languages,
							keywords: results.rows[0].keywords,
							insertDate: results.rows[0].insertdate,
							updateDate: results.rows[0].updatedate,
						},
					],
					message: 'success',
				}
			} else {
				logger.info(`No movie found with the name: ${filters}`)
				return {
					data: [],
					message: 'success',
				}
			}
		} catch (error) {
			logger.error(
				`Failed to retrieve movie with the name: ${filters}, error: ${error}`
			)
			return { data: undefined, message: error }
		}
	}
}
