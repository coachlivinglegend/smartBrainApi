import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import knex from 'knex';
import { handleRegister } from './controllers/register.mjs';
import { handleSignIn } from './controllers/signin.mjs';
import { handleProfileUpdate } from './controllers/profile.mjs';
import { handleScoreIncrement } from './controllers/score.mjs';
import { handleApiCall } from './controllers/score.mjs';

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'smartbrain'
    }
});


const app = express();

app.use(express.json());
app.use(cors())



app.get('/', (req, res) => res.send('it is working'))
app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) } )
app.post('/signin', (req, res) => { handleSignIn(req, res, db, bcrypt) } )
app.get('/profile/:id', (req, res) => { handleProfileUpdate(req, res, db) } )
app.put('/image', (req, res) => { handleScoreIncrement(req, res, db) } )
app.post('/imageurl', (req, res) => { handleApiCall(req, res) } )


app.listen(process.env.PORT || 3000, ()=> {
    console.log(`app is running on port ${process.env.PORT}`)
})

