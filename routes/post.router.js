import express from 'express'

const router = express.Router()

router.get('/post', (req, res) => {
    res.json({
        'name': 'hi',
        'age': 12
    })
})

export default router
