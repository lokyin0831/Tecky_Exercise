import express from 'express';
import expressSession from 'express-session';
import path from 'path';

const app = express();

function datetime() {
    const date = new Date();
    const year = date.getFullYear()
    const month = getTwoDigit(date.getMonth())
    const day = getTwoDigit(date.getDay())
    const h = getTwoDigit(date.getHours())
    const m = getTwoDigit(date.getMinutes())
    const s = getTwoDigit(date.getSeconds())

    return `[${year}-${month}-${day} ${h}:${m}:${s}] `
}

function getTwoDigit(value: number) {
    if (value < 10) {
        return `0${String(value)}`
    } 
    return String(value)
}
// Add this line
app.use(
    expressSession({
      secret: 'hsfodhsfouhwqeljdbhqwjlesad',
      resave: true,
      saveUninitialized: true,
    }),
  )
  
declare module 'express-session' {
    interface SessionData {
        counter?: number
    }
}
app.use((req, res, next) => {
    console.log( datetime() + " Request " + req.path)
    next()
})
// wallsadsadsad
app.get('/', (req, res, next) => {
    if (req.session.counter) {
        req.session.counter += 1
    } else {
        req.session.counter = 1
    }
    console.log("counter: " + req.session.counter)
    
    res.sendFile(path.resolve('./public/wall.html'))
})

app.use(express.static('public')) // auto to do next()
app.use(express.static('error')) // auto to do next()

app.use((req, res, next) => {
    res.sendFile(path.resolve('./error/404.html'))
})

app.listen(8080, () => {
    console.log('Listening on port 8080');
})