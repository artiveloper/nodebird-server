import express from 'express'
import routerRegister from './routes/register'
import db from './models'

db.sequelize.sync()
    .then(() => {
        console.log('db 연결 성공')
    })
    .catch(console.log)

const app = express()

routerRegister(app)

app.listen(3000, () => {
    console.log('server running on 3000 port.')
})
