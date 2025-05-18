import { Knex } from 'knex'
import { logger } from '../../common/logger'
import { MagicMovie } from '../../common/interfaces'
import { applyQueryFilter } from '../function'

export class GetMagicMoviesController {
	public async getMovie(
		connection: Knex,
		table: string,
		filters: any
	): Promise<{ data: MagicMovie[] | undefined | string; message: any }> {
		logger.info({
			msg: `Attempting to retrieve 1 movie based on: ${JSON.stringify(
				filters
			)}`,
		})

		try {
			let dbQuery: Knex.QueryBuilder = connection(table)

			let { results } = await applyQueryFilter(dbQuery, filters, true)

			if (results && Object.keys(results).length > 0) {
				logger.info({ msg: `Movie retrieved: ${JSON.stringify(results)}` })

				let movies: MagicMovie[] = []
				results.forEach((movie: any) => {
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
					data: 'not found',
					message: 'success',
				}
			}
		} catch (error) {
			logger.error(
				`Failed to retrieve movie with the filters: ${JSON.stringify(
					filters
				)}, error: ${error}`
			)
			return { data: undefined, message: error }
		}
	}

	public async getMovies(
		connection: Knex,
		table: string,
		filters: string,
		page?: number
	): Promise<{
		data: MagicMovie[] | undefined
		message: any
		totalRecords: number
		nextPage?: number
	}> {
		let size: number = Number(process.env.SIZE)
		logger.info({
			msg: `Attempting to retrieve movies based on: ${JSON.stringify(filters)}`,
		})

		try {
			let dbQuery: Knex.QueryBuilder = connection(table)

			let { results, nextPage } = await applyQueryFilter(
				dbQuery,
				filters,
				false,
				page,
				size
			)

			let totalRecords: any = await connection(table).count('*')

			totalRecords = Number(totalRecords[0].count)

			if (results && results.length > 0) {
				let movies: MagicMovie[] = []
				results.forEach((movie: any) => {
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
					nextPage: nextPage,
					totalRecords: totalRecords,
					message: 'success',
				}
			} else {
				logger.info(`No movie found: ${results}`)
				return {
					data: [],
					totalRecords: totalRecords,
					message: 'success',
				}
			}
		} catch (error) {
			logger.error(
				`Failed to retrieve movie with the name: ${filters}, error: ${error}`
			)
			return { data: undefined, totalRecords: 0, message: error }
		}
	}
}
