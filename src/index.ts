import express, { Application } from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'
import swaggerUi from 'swagger-ui-express'

dotenv.config({ path: process.cwd() + '/.env' })

const compression = require('compression')

const app: Application = express()

const YAML = require('yamljs')

const PORT = Number(process.env.PORT) | 8080

const routes = require('./routes/routes')

const swagger = YAML.load('./src/docs/spec.yaml')

app.use('/docs', swaggerUi.setup(swagger))

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

app.use(
	compression({
		threshold: 0,
		level: 9,
	})
)

app.use(routes)

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`)
})
