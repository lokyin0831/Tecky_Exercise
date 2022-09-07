import express from 'express'

export const isloggedin = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	if (req.session['isloggedin']) {
		next()
		return
	}
	res.status(401).send('Please login first')
	return
}
