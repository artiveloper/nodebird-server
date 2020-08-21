import postRouter from './post.router';

const register = (app) => {
    app.use(postRouter)
}

module.exports = register
