import { Request, Response } from 'express'
import { GetMagicMoviesController } from '../../../src/controllers'
import knex from 'knex'

jest.mock('knex', () => {
	const mKnex = {
		select: jest.fn().mockReturnThis(),
		where: jest.fn().mockReturnThis(),
		first: jest.fn().mockReturnThis(),
		from: jest.fn().mockReturnThis(),
		then: jest.fn(),
	}
	return jest.fn(() => mKnex)
})

describe('GetController', () => {
	let controller: GetMagicMoviesController
	let req: Partial<Request>
	let res: Partial<Response>
	let jsonMock: jest.Mock
	let statusMock: jest.Mock

	beforeEach(() => {
		controller = new GetMagicMoviesController()
		jsonMock = jest.fn()
		statusMock = jest.fn().mockReturnValue({ json: jsonMock })
		res = {
			status: statusMock,
			json: jsonMock,
		}
		req = {}
	})

	it('should return a single movie using multi-filter function', async () => {
		req.query = { title: 'Inception', release_date: '2010' }
		const movie = { title: 'Inception', release_date: 2010 }

		jest.spyOn(controller, 'getMovie').mockResolvedValueOnce(movie as any)

		const conn = knex({
			client: 'pg',
			connection: {
				user: 'postgres',
				password: '1234',
				database: 'magic_db',
				host: 'localhost',
				port: 5432,
			},
		})

		let filters = req.query

		const result = await controller.getMovie(
			conn,
			`magic_movie_catalogue`,
			filters
		)
		expect(controller.getMovie).toHaveBeenCalledWith(
			req as Request,
			res as Response
		)
	})

	it('should return all movies', async () => {
		req.query = { release_date: { lte: '2010' } }
		const movies = [
			{ title: 'Inception', release_date: 2010 },
			{ title: 'The Matrix', release_date: 1999 },
		]

		jest.spyOn(controller, 'getMovies').mockResolvedValueOnce(movies as any)

		const conn = knex({
			client: 'pg',
			connection: {
				user: 'postgres',
				password: '1234',
				database: 'magic_db',
				host: 'localhost',
				port: 5432,
			},
		})

		let filters = req.query

		const result = await controller.getMovie(
			conn,
			`magic_movie_catalogue`,
			filters
		)
		expect(controller.getMovie).toHaveBeenCalledWith(
			req as Request,
			res as Response
		)
	})
})
