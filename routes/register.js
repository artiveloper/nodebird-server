import postRouter from './post.router'
import userRouter from './user.router'

const register = (app) => {
    app.use(postRouter)
    app.use(userRouter)
}

module.exports = register
