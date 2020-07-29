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


const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }

    ]
}

app.get('/', (req, res) => {
    res.send(database)
})




app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) } )

app.post('/signin', (req, res) => { handleSignIn(req, res, db, bcrypt) } )


app.get('/profile/:id', (req, res) => { handleProfileUpdate(req, res, db) } )

app.put('/image', (req, res) => { handleScoreIncrement(req, res, db) } )

app.post('/imageurl', (req, res) => { handleApiCall(req, res) } )


















app.listen(3000, ()=> {
    console.log('app is running on port 3000')
})