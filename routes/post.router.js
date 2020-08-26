import express from 'express'
import {
    isLoggedIn,
} from '../middlewares'
import {
    findPost,
    save,
    saveComment,
} from '../repositories/post.repository'

const router = express.Router()

router.post('/',  isLoggedIn, async (req, res, next) => {
    try {
        const savedPost = await save(req.user.id, req.body.content)
        const fullPost = await findPost(savedPost.id)
        res.status(201).send(fullPost)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
    try {
        let postId = req.params.postId;
        const post = await findPost(postId)
        if(!post) {
            return res.status(403).send('존재하지 않는 게시글입니다.')
        }
        const savedComment = await saveComment(postId, req.body.content)
        res.status(201).send(savedComment)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

export default router
