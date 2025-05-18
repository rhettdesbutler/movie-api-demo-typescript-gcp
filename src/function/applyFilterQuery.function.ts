import { Knex } from 'knex'
import { filterMapper } from '../utils/filterMapper'
import { logger } from '../../common/logger'

const allowedFilters = {
	title: ['like'],
	genres: ['eq', 'like'],
	year: ['gte', 'lte', 'eq'],
	year_between: ['gte', 'lte', 'eq'],
	release_date: ['gte', 'lte', 'eq'],
	budget: ['gte', 'lte', 'eq'],
	runtime: [],
	status: ['eq'],
}

const operator = {
	eq: '=',
	like: 'LIKE',
	gte: '>=',
	lte: '<=',
}
export const applyQueryFilter = async (
	dbQuery: Knex.QueryBuilder,
	filters: any,
	single: boolean,
	page?: number,
	size?: number
): Promise<{ results: any; nextPage?: number }> => {
	for (const field in filters) {
		let fvalue = filters[field]

		if (
			typeof fvalue === 'object' &&
			fvalue !== null &&
			!Array.isArray(fvalue)
		) {
			for (const opKey in fvalue) {
				let opVal = fvalue[opKey]

				logger.debug({
					msg: `complex filter query: ${opKey}, ${field}, ${opVal}`,
				})
				switch (opKey) {
					case 'gte':
						dbQuery.where(field, '>=', opVal)
						break
					case 'lte':
						dbQuery.where(field, '<=', opVal)
						break
					case 'gt':
						dbQuery.where(field, '>', opVal)
						break
					case 'lt':
						dbQuery.where(field, '<', opVal)
						break
					case 'eq':
						dbQuery.where(field, '=', opVal)
						break
					case 'like':
						dbQuery.where(field, 'ILIKE', `%${opVal}%`)
						break
				}
			}
		} else if (typeof fvalue === 'string' && fvalue.includes(',')) {
			const list = fvalue.split(',').map((v) => v.trim())

			logger.debug({
				msg: `list filter query: ${field}, ${list}`,
			})
			dbQuery.whereIn(field, list)
		} else {
			logger.debug({
				msg: `basic filter query: ${field}, ${fvalue}`,
			})
			dbQuery.where(field, fvalue)
		}
	}

	if (single === true) {
		return dbQuery.select('*').limit(1)
	} else {
		if (page && size) {
			let dbResults = await dbQuery
				.select('*')
				.offset((page - 1) * size)
				.limit(size)
			return {
				results: dbResults,
				nextPage: page + 1,
			}
		} else {
			return dbQuery.select('*')
		}
	}
}
