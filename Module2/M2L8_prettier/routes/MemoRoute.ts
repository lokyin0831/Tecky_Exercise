import express from 'express'
import { logger } from '../logger'
import jsonfile from 'jsonfile'
import path from 'path'
import { isloggedin } from '../guard'
import { formParse } from '../upload'
export const memosRoutes = express.Router()

memosRoutes.get('/like/counter', async (req, res) => {
	const memos = await jsonfile.readFile(path.join(__dirname, '../memos.json'))
	res.status(200).json({
		counter: memos.liked_usernames.length
	})
})

memosRoutes.post('/like', isloggedin, async (req, res) => {
	try {
		const username = req.session['name'] || ''
		const memoIndex = req.body.memoIndex

		const memos = await jsonfile.readFile(path.join(__dirname, '../memos.json'))
		
		const newMemos = memos.map((memo: any, index: number) => {
			let liked_usernames: string[] = memo.liked_username
			const isliked: boolean = liked_usernames.includes(username)
			if (memoIndex != index) {
				return memo
			}
			console.log("isliked : " + isliked)
			console.log("memoIndex : " + memoIndex)
			console.log("index : " + index)

			if (isliked) {
				liked_usernames = liked_usernames.filter((liked_username: string) => {
					if (liked_username == username) {
						return false
					} else {
						return true
					}
				})
			} else {
				liked_usernames.push(username)
			}
			memo.liked_username = liked_usernames
			return memo
		})
		await jsonfile.writeFile(path.join(__dirname, '../memos.json'), newMemos, {
			spaces: 2
		})
		res.status(200).json({
			memos: newMemos
		})
		return
	} catch (err: any) {
		logger.error(err)
		res.status(400).send(err.message)
		return
	}
})

memosRoutes.put('/', async (req, res) => {
	try {
		const content = req.body.text
		const index = req.body.index

		logger.debug('content : ' + content)
		logger.debug('index : ' + index)

		const memos = await jsonfile.readFile(path.join(__dirname, '../memos.json'))
		let newObj = memos[index]
		newObj.msg = content
		memos[index] = newObj
		await jsonfile.writeFile(path.join(__dirname, '../memos.json'), memos, {
			spaces: 2
		})
		res.json(memos)
		return
	} catch (err: any) {
		console.log(err.message)
		logger.error(err.message)

		res.status(400).send("Update error: " + err.message)
		return
	}

})

memosRoutes.delete('/', isloggedin, async (req, res) => {
	const inputIndex = req.body.index
	let memos = await jsonfile.readFile(path.join(__dirname, '../memos.json'))

	memos = memos.filter((memo: any, index: number) => {
		if (inputIndex == index) {
			return false // 唔要
		} else {
			return true // 要
		}
		// return inputIndex != index
	})

	await jsonfile.writeFile(path.join(__dirname, '../memos.json'), memos, {
		spaces: 2
	})
	res.json(memos)
	return
})

memosRoutes.get('/', async (req, res) => {
	const memos = await jsonfile.readFile(path.join(__dirname, '../memos.json'))
	res.status(200).json(memos)
    return
})

memosRoutes.post('/formidable', async (req, res) => {
	try {
		const obj: any = await formParse(req)
		const memos = await jsonfile.readFile(
			path.join(__dirname, '../memos.json')
		)
		memos.push({
			msg: obj['text'],
			filename: obj['filename'],
			liked_username: []
		})
		await jsonfile.writeFile(path.join(__dirname, '../memos.json'), memos, {
			spaces: 2
		})
		res.status(200).send('Upload successful')
		return
	} catch (e) {
		res.status(400).send('Upload Fail')
		return
	}
})