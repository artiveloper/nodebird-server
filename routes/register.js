import postRouter from './post.router'
import postsRouter from './posts.router'
import userRouter from './user.router'

const register = (app) => {
    app.use('/post', postRouter)
    app.use('/posts', postsRouter)
    app.use('/user', userRouter)
}

module.exports = register
