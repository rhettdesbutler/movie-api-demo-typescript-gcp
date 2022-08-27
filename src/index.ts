import express, { Application } from 'express'
import { exampleRouter } from './routes/routes'

const PORT = Number(process.env.PORT) | 4000

const app: Application = express()

app.use(exampleRouter)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
