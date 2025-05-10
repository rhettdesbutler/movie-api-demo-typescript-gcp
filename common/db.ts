import knex, { Knex } from 'knex'
import { logger } from './logger'

export class Database {
	async getPassword(): Promise<string> {
		return '1234secure&D3'
	}

	async connect(db?: string): Promise<Knex | undefined> {
		let database
		let dbPassword, dbHost: string

		if (db) {
			database = db
		} else {
			database = String(process.env.DB_MOVIE)
		}

		if (String(process.env.LOCAL) === 'true') {
			dbPassword = '1234secure&D3'
			dbHost = String(process.env.DB_HOST)
		} else {
			dbPassword = await this.getPassword()
			dbHost = `/cloudsql/${String(process.env.DB_HOST)}`
		}

		let connection

		if (!dbPassword) {
			logger.error({
				msg: `Unable to determine DB password!`,
			})

			return undefined
		}

		connection = knex({
			client: 'pg',
			connection: {
				user: process.env.DB_USER,
				password: dbPassword,
				database: database,
				host: dbHost,
				port: Number(process.env.DB_PORT),
				pool: {
					max: 2,
					min: 1,
					acquireTimeoutMillis: 60 * 1000,
					idleTimeoutMillis: 300000,
				},
			},
			acquireConnectionTimeout: 120000,
		})

		try {
			await connection.raw(`SELECT 1`)

			logger.info({
				msg: `DB connection established!`,
				db: database,
			})

			return connection
		} catch (error) {
			logger.error({
				msg: `Failed to establish db connection...`,
				db: database,
				error: error,
			})
			return undefined
		}
	}

	async closeConnection(connection: Knex): Promise<void> {
		try {
			connection.destroy()

			logger.info({
				msg: `DB connection closed!`,
			})
		} catch (error) {
			logger.error({
				msg: `Failed to close the db connection!`,
				error: error,
			})
		}
	}
}
