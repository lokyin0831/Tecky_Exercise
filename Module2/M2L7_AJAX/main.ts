import express from 'express';
import { Request, Response } from 'express';
import expressSession from 'express-session'
import { request } from 'http';
import { nextTick } from 'process';
import fs from 'fs';
import formidable, { Files } from 'formidable'
import path from 'path';
import jsonfile from 'jsonfile';
import { formParse, uploadDir } from './upload';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/adminLogin', (req, res) => {
    console.log(req.body)
    const username = req.body.username
    const password = req.body.password
    console.log("username: " + username)
    console.log("password: " + password)

    if (username === 'lokyin0831' && password === '1234') {
        res.redirect("/index.html")
        console.log("login successful")
        return
    }
    res.end("You are not admin!!!")
})

app.post('/index', async (req, res) => {
    try {
        const obj: any = await formParse(req)
        const memos = await jsonfile.readFile(path.join(__dirname, '/public/memos.json'));
        memos.push({ 
            memoText: obj['text'],
            filename: obj['filename']
        })
        await jsonfile.writeFile(path.join(__dirname, '/public/memos.json'),memos, {spaces:2})
        res.status(200).send("Upload successful")
        return


    } catch (err) {
        res.status(400).send("Upload Fail")
        return
    }
})

// Auto create a folder
fs.mkdirSync(uploadDir, { recursive: true })

app.use(express.static('public'))

app.listen(8080, () => {
    console.log('listening on port 8080');
})

