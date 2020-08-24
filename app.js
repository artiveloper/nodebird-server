import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import passport from 'passport'
import dotenv from 'dotenv'

import passportConfig from './passport'
import routerRegister from './routes/register'
import db from './models'

dotenv.config()

// database configuration
const databaseOptions = {
    force: process.env.NODE_ENV === 'development' ? true : false
}

db.sequelize.sync(databaseOptions)
    .then(() => {
        console.log('db 연결 성공')
    })
    .catch(console.log)

// passport configuration
passportConfig()

// express configuration
const app = express()

app.use(cors({
    origin: '*',
    credential: false,
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

routerRegister(app)

app.listen(3000, () => {
    console.log('server running on 3000 port.')
})
