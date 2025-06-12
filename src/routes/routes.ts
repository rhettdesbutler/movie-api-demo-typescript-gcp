import { Router, Request, Response, NextFunction } from 'express'
import { Knex } from 'knex'
import { Database } from '../../common/db'
import { GetMagicMoviesController } from '../controllers/get-controller'
import {
	MagicMoviePostResponse,
	MagicMovieResponse,
} from '../../common/interfaces/responses.interface'
import {
	postResponseHandler,
	responseHandler,
} from '../../common/reponseHandler'
import { logger } from '../../common/logger'
import { keyExists } from '../../common/utils'
import { MagicMovie } from '../../common/interfaces'
import { PostMagicMoviesController } from '../controllers'

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
			let filters: any = req.query
			let { data, message } = await getMovieController.getMovie(
				conn,
				String(process.env.DB_MOVIES_TABLE),
				filters
			)

			let responsePayload = responseHandler(data, message)

			status = responsePayload.status
			response = responsePayload.response

			if (status > 299) {
				logger.info(
					`Error in movie retrieval occurred: ${response.magicMovies.error}`
				)
			}

			await db.closeConnection(conn)
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
			let filters: any = req.query

			let page: number | undefined = undefined

			if (keyExists(filters, 'page') === true) {
				page = Number(filters['page'])

				if (Number(page) <= 1) {
					page = 1
				}

				delete filters['page']
			}

			let { data, message, totalRecords, nextPage } =
				await getMovieController.getMovies(
					conn,
					String(process.env.DB_MOVIES_TABLE),
					filters,
					page
				)

			let responsePayload = responseHandler(
				data,
				totalRecords,
				nextPage,
				message
			)

			status = responsePayload.status
			response = responsePayload.response

			await db.closeConnection(conn)
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

router.post(
	'/magicmovies/movie',
	async (req: Request, res: Response, next: NextFunction) => {
		const db: Database = new Database()

		const postMovieController: PostMagicMoviesController =
			new PostMagicMoviesController()

		const conn: Knex | undefined = await db.connect()

		let response: MagicMoviePostResponse
		let status: number
		if (conn) {
			let movieToAdd: MagicMovie = req.body

			let { status, message, error } = await postMovieController.postMovie(
				conn,
				String(process.env.DB_MOVIES_TABLE),
				movieToAdd
			)

			let responsePayload = postResponseHandler(status, message, error)

			response = responsePayload.response

			await db.closeConnection(conn)
		} else {
			status = 500
			response = {
				magicMovies: {
					status: status,
					message: `Internal Server error`,
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
