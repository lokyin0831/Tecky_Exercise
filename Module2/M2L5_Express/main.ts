import express from 'express';
import {Request, Response} from 'express';
import expressSession from 'express-session'

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use(express.static('public'))

app.get('/index.html', (req, res, next) => {

})

app.listen(8080, () => {
    console.log('listening on port 8080');
})
