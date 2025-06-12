import { Knex } from 'knex'
import { MagicMovie } from '../../common/interfaces'
import { logger } from '../../common/logger'

export class PostMagicMoviesController {
	public async postMovie(
		connection: Knex,
		table: string,
		movie: MagicMovie
	): Promise<{ status: number; message: string; error?: any }> {
		let status: number = 200
		let message: string = `success`
		logger.info({ msg: `Adding a movie to the database`, movie: movie })

		try {
			await connection(table).insert({
				title: movie.title,
				voteAverage: movie.voteAverage,
				voteCount: movie.voteCount,
				status: movie.status,
				releaseDate: movie.releaseDate,
				revenue: movie.revenue,
				runtime: movie.runtime,
				adult: movie.adult,
				backdropPath: movie.backdropPath,
				budget: movie.budget,
				homepage: movie.homepage,
				imdbId: movie.imdbId,
				originalLanguage: movie.originalLanguage,
				originalTitle: movie.originalTitle,
				overview: movie.overview,
				popularity: movie.popularity,
				posterPath: movie.posterPath,
				tagline: movie.tagline,
				genres: movie.genres,
				productionCompanies: movie.productionCompanies,
				productionCountries: movie.productionCountries,
				spokenLanguages: movie.spokenLanguages,
				keywords: movie.keywords,
				insertDate: movie.insertDate,
				updateDate: movie.updateDate,
			})
		} catch (error) {
			logger.error({ msg: `Insert failed: ${error}`, movie })

			return {
				status,
				message,
				error,
			}
		}

		return {
			status,
			message,
		}
	}
}
