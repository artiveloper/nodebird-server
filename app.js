import express from 'express'
import routerRegister from './routes/register'

const app = express()

routerRegister(app)

app.listen(3000, () => {
    console.log('server running on 3000 port.')
})
