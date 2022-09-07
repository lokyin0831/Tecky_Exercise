import express from 'express';
import expressSession from 'express-session';
import fs from 'fs'
import { formParse, uploadDir } from './upload';
import jsonfile from 'jsonfile'
import path from 'path';
import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const SALT_ROUNDS = 10;

export const client = new Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
});

const app = express();
app.use(express.json())
app.use(express.urlencoded())



app.use(
  expressSession({
    secret: 'johwekqdnjwqbdjkqbwdjkbqw',
    resave: true,
    saveUninitialized: true,
  }),
)

declare module 'express-session' {
  interface SessionData {
    name?: string
    isloggedin?: boolean
  }
}
const isloggedin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.session.isloggedin) {
    next()
    return
  }
  res.status(401).send("Please login first")
  return
}

client.connect()






app.post('/login', async (req, res) => {
  const inputUsername = req.body.username
  const inputPassword = req.body.password

  // Get users account info in the Database //
  const usernames = await client.query(
    'SELECT * from users WHERE username = $1 AND password = $2',
    [inputUsername, inputPassword]
  )
  console.log(usernames.rows)

  if (usernames.rows.length == 1) {
    req.session.isloggedin = true
    req.session.name = usernames.rows[0].username
    res.status(200).send("Success")
    return
  }
  res.status(401).send("Login Error")
})

app.get('/test', (req, res) => {
  setSession(req)
  res.end('ok')
})
async function setSession(req: any) {
  setTimeout(() => {
    req.session['name'] = 'dickson'
    req.session.save()
    console.log('setSession done');

  }, 4000);
}


app.get('/check-session', (req, res) => {
  res.json(req.session as any)
})
app.put('/memos', isloggedin, async (req, res) => {
  console.log(req.body)

  const content = req.body.text
  const index = req.body.index

  const memos = await jsonfile.readFile(path.join(__dirname, 'memos.json'))
  let newObj = memos[index]
  newObj.msg = content
  memos[index] = newObj
  await jsonfile.writeFile(path.join(__dirname, 'memos.json'), memos, { spaces: 2 })

  res.json(memos)
})

app.delete('/memos', isloggedin, async (req, res) => {
  const inputIndex = req.body.index
  let memos = await jsonfile.readFile(path.join(__dirname, 'memos.json'))

  memos = memos.filter((memo: any, index: number) => {
    return inputIndex != index
  })

  await jsonfile.writeFile(path.join(__dirname, 'memos.json'), memos, { spaces: 2 })
  res.json(memos)
  return
})

app.get('/memos', async (req, res) => {

  const memos = await jsonfile.readFile(path.join(__dirname, 'memos.json'))
  res.status(200).json(memos)
})

app.post('/memo-formidable', async (req, res) => {
  try {
    const obj: any = await formParse(req)
    const memos = await jsonfile.readFile(path.join(__dirname, 'memos.json'))
    memos.push({
      msg: obj['text'],
      filename: obj['filename']
    })
    await jsonfile.writeFile(path.join(__dirname, 'memos.json'), memos, { spaces: 2 })
    res.status(200).send("Upload successful")
    return
  } catch (e) {
    res.status(400).send("Upload Fail")
    return
  }
})

// Auto create a folder
fs.mkdirSync(uploadDir, { recursive: true })

app.use(express.static('public')) // auto to do next()
app.use('/uploads', express.static('uploads')) // auto to do next()

app.listen(8080, () => {
  console.log('Listening on port 8080');
})