import { Knex } from 'knex'
import { MagicMovie } from '../../common/interfaces'
import { logger } from '../../common/logger'

export class PostMagicMoviesController {
	public async postMovie(
		connection: Knex,
		table: string,
		movie: MagicMovie
	): Promise<{ status: number; message: string }> {
		let status: number = 200
		let message: string = `success`
		logger.info({ msg: `Adding a movie to the database`, movie: movie })

		return {
			status,
			message,
		}
	}
}
