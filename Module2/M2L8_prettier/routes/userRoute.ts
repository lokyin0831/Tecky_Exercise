import express from 'express'
import jsonfile from 'jsonfile'
import path from 'path'

export const userRoutes = express.Router()

userRoutes.post('/login', async (req, res) => {
    console.log("userRoutes - [/login]")
	const username = req.body.username
	const password = req.body.password

	const users = await jsonfile.readFile(path.join(__dirname, '../users.json'))

	for (let user of users) {
		if (user.username == username && user.password == password) {
			req.session.isloggedin = true
			req.session.name = user.username
			res.status(200).send('Success')
			return
		}
	}
	res.status(401).send('Login Error')
})