import { Router, Request, Response, NextFunction } from 'express'
import { Knex } from 'knex'
import { Database } from '../../common/db'
import { GetMagicMoviesController } from '../controllers/get-controller'
import { MagicMovieResponse } from '../../common/interfaces/responses.interface'
import { responseHandler } from '../../common/reponseHandler'

const router = Router()

router.get(
	'/magicmovies/movie',
	async (req: Request, res: Response, next: NextFunction) => {
		const db: Database = new Database()

		const getMovieController: GetMagicMoviesController =
			new GetMagicMoviesController()

		const conn: Knex | undefined = await db.connect()

		let response: MagicMovieResponse
		let status: number
		if (conn) {
			let filters = req.query

			console.log(filters)

			let { data, message } = await getMovieController.getMovie(
				conn,
				String(process.env.DB_MOVIES_TABLE),
				filters
			)

			let responsePayload = responseHandler(data, message)

			status = responsePayload.status
			response = responsePayload.response
		} else {
			status = 500
			response = {
				magicMovies: {
					totalRecords: 0,
					recordsFetched: 0,
					data: [],
					error: `Internal Server Error`,
				},
			}
		}

		return res
			.status(status)
			.set({
				'Content-Type': 'application/json',
			})
			.send(response)
	}
)

router.get(
	'/magicmovies/movies',
	async (req: Request, res: Response, next: NextFunction) => {
		const db: Database = new Database()

		const getMovieController: GetMagicMoviesController =
			new GetMagicMoviesController()

		const conn: Knex | undefined = await db.connect()

		let response: MagicMovieResponse
		let status: number
		if (conn) {
			let { data, message } = await getMovieController.getMovie(
				conn,
				String(process.env.DB_MOVIES_TABLE),
				'terminator'
			)

			let responsePayload = responseHandler(data, message)

			status = responsePayload.status
			response = responsePayload.response
		} else {
			status = 500
			response = {
				magicMovies: {
					totalRecords: 0,
					recordsFetched: 0,
					data: [],
					error: `Internal Server Error`,
				},
			}
		}

		return res
			.status(status)
			.set({
				'Content-Type': 'application/json',
			})
			.send(response)
	}
)

module.exports = router
