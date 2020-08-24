import express from 'express'
import {
    findByEmail,
    save
} from '../repositories/user.repository';
import bcrypt from 'bcrypt'

const router = express.Router()

router.post('/user',async (req, res, next) => {
    try {
        const exist = await findByEmail(req.body.email)
        if (exist) {
            return res.status(403).send('이미 사용중인 아이디입니다')
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10) // 10 ~ 13
        await save(req.body.email, req.body.nickname, hashedPassword)

        res.status(201).send('ok')
    } catch (error) {
        console.log(error)
        next(error)
    }
})

export default router
