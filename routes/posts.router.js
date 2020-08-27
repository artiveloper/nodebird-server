import express from 'express'
import {
    findAllPost
} from '../repositories/post.repository'

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const limit = req.body.limit || 10
        const lastPostId = req.body.lastPostId || 10
        const posts = await findAllPost(limit, lastPostId)
        res.status(200).json(posts)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

export default router
