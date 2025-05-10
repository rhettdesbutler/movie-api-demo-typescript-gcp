import { Knex } from 'knex'
import { filterMapper } from '../utils/filterMapper'

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
export const applyFiltering = async (
	connection: Knex,
	table: string,
	filters: any
) => {
	let dbQuery = connection(table)

	for (const field in filters) {
		let fvalue = filters[field]

		if (
			typeof fvalue === 'object' &&
			fvalue !== null &&
			!Array.isArray(fvalue)
		) {
			for (const opKey in fvalue) {
				let opVal = fvalue[opKey]

				console.log(`sc: ${opKey}, ${field}, ${opVal}`)
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
						dbQuery.where(field, 'LIKE', `%${opVal}%`)
						break
				}
			}
		} else if (typeof fvalue === 'string' && fvalue.includes(',')) {
			const list = fvalue.split(',').map((v) => v.trim())
			dbQuery.whereIn(field, list)
		} else if (field === 'title') {
			dbQuery
				.whereRaw(`to_tsvector('english', title) @@ to_tsquery('english', ?)`, [
					fvalue,
				])
				.select('*')
		} else {
			console.log(`basic`)
			dbQuery.where(field, fvalue).select('*')
		}
	}

	return dbQuery.select('*')
}
