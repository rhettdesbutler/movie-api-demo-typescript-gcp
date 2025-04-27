import express, { Application } from 'express'
import { exampleRouter } from './routes/routes'
import dotenv from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'

dotenv.config({ path: process.cwd() + './env' })

const compression = require('compression')
const YAML = require('yamljs')

const PORT = Number(process.env.PORT) | 8080

const app: Application = express()

const swagger = YAML.load('./src/docs/spec.yaml')

app.use(express.json({ limit: '50mb' }))
app.use(
	express.urlencoded({
		limit: '50mb',
		extended: true,
	})
)
app.use(morgan('tiny'))
app.use(express.static('public'))
app.use(helmet())

app.use(exampleRouter)

app.use(
	compression({
		threshold: 0,
		level: 9,
	})
)

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`)
})
