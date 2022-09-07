import express from 'express'
import expressSession from 'express-session'
import fs from 'fs'
import { uploadDir } from './upload'
import { logger } from './logger'
import { userRoutes } from './routes/userRoute'
import { memosRoutes } from './routes/MemoRoute'

const app = express()
app.use(express.json())
app.use(express.urlencoded())

app.use(
	expressSession({
		secret: 'johwekqdnjwqbdjkqbwdjkbqw',
		resave: true,
		saveUninitialized: true
	})
)

declare module 'express-session' {
	interface SessionData {
		name?: string
		isloggedin?: boolean
	}
}

app.use('/user', userRoutes)
app.use('/memos', memosRoutes)


// Auto create a folder
fs.mkdirSync(uploadDir, { recursive: true })

app.use(express.static('public')) // auto to do next()
app.use('/uploads', express.static('uploads')) // auto to do next()

app.listen(8080, () => {
	logger.info('Listening on port 8080')
})
