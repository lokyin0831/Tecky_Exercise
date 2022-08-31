import express from 'express';
import { Request, Response } from 'express';
import expressSession from 'express-session'
import { request } from 'http';
import { nextTick } from 'process';
import fs from 'fs';
import formidable from 'formidable'

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/login', (req, res) => {
    console.log(req.body)
    const email = req.body.email
    const password = req.body.password
    console.log("username: " + email)
    console.log("password: " + password)

    //admin login

    // const dir = path.join(__dirname, "users.json")
    // console.log(dir)

    // jsonfile.readFileSync(dir)
    // const users = jsonfile.readFileSync(dir)
    // console.log(users)


    if (email === 'lokyin0831@gmail.com' && password === '1234') {
        res.redirect("/index.html")
        return
    }
    res.end("end")
})


app.post('/index', (req, res) => {
    console.log(req.body)
    const inputObject = req.body.memoText


    try {
        const data = fs.readFileSync('/Users/christy/Desktop/Code/Tecky_Exercise/Module2/M2L6_HTTP/public/memos.json', 'utf8');
        const arrayOfData = JSON.parse(data);
        arrayOfData.push({ content: inputObject })
        fs.writeFileSync('/Users/christy/Desktop/Code/Tecky_Exercise/Module2/M2L6_HTTP/public/memos.json', JSON.stringify(arrayOfData));


        console.log(arrayOfData);
    } catch (err) {
        console.error(err);
    }




    // res.end("end")
})









// app.get('/', function (req, res) {
//     const name = req.query.name;
//     const password = req.query.password
//     res.end(`Name is ${name}, password is ${password}`);

//     console.log(`Name is ${name}, password is ${password}`)
// })



app.use(express.static('public'))


app.listen(8080, () => {
    console.log('listening on port 8080');
})
