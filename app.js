import express from 'express'
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

routerRegister(app)

app.listen(3000, () => {
    console.log('server running on 3000 port.')
})
