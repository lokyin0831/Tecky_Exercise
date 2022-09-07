import express from 'express';
import expressSession from 'express-session';
import fs from 'fs'
import { formParse, uploadDir } from './upload';
import jsonfile from 'jsonfile'
import path from 'path';
import { Client } from 'pg';
import dotenv from 'dotenv';
import * as bcrypt from 'bcryptjs';
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

// bcrypt
async function hashPassword(plainPassword: string) {
  const hash = await bcrypt.hash(plainPassword, SALT_ROUNDS);
  return hash;
};
async function checkPassword(plainPassword: string, hashPassword: string) {
  const match = await bcrypt.compare(plainPassword, hashPassword);
  return match;
}

app.post('/login', async (req, res) => {
  const inputUsername = req.body.username
  const inputPassword = req.body.password

  let bcryptedPassword = await hashPassword(inputPassword)

  // await client.query(`INSERT INTO users (username,password) VALUES ($1,$2)`,[inputUsername,bcryptedPassword])

  const users = (await client.query(`SELECT * FROM users WHERE users.username = $1`, [inputUsername])).rows;
  const user = users[0];
  if (!user) {
    return res.status(401).send('Wrong username!!!')
  }
  const match = await checkPassword(inputPassword, user.password);
  if (match) {
    req.session.isloggedin = true
    return res.send('Login successful!!!'); // Can go to the protected page.
  } else {
    return res.status(401).send('Wong password!!!')
  }

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