import express from 'express'
import passport from 'passport'
import bcrypt from 'bcrypt'
import {
    findByEmail,
    save
} from '../repositories/user.repository'

const router = express.Router()

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (info) {
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (loginErr) => {
            if (loginErr) {
                console.error(loginErr)
                return next(loginErr)
            }
            return res.status(200).json('data');
        })
    })(req, res, next)
})

router.post('/', async (req, res, next) => {
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

router.post('/logout', (req, res, next) => {
    req.logout()
    req.session.destroy()
    req.send('ok')
})

export default router
