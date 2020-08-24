import express from 'express'
import cors from 'cors'
import routerRegister from './routes/register'
import db from './models'

// database configuration
const databaseOptions = {
    force: process.env.NODE_ENV === 'development' ? true : false
}

db.sequelize.sync(databaseOptions)
    .then(() => {
        console.log('db 연결 성공')
    })
    .catch(console.log)

// express configuration
const app = express()

app.use(cors({
    origin: '*',
    credentials: false,
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

routerRegister(app)

app.listen(3000, () => {
    console.log('server running on 3000 port.')
})
