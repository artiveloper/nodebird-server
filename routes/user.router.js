import express from 'express'
import passport from 'passport'
import bcrypt from 'bcrypt'
import {
    isLoggedIn,
    isNotLoggedIn,
} from '../middlewares'
import {
    findByEmail, findById,
    getUserInfoWithPost,
    save
} from '../repositories/user.repository'

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        if (req.user) {
            const user = await getUserInfoWithPost(req.user.id)
            res.status(200).json(user)
        } else {
            res.status(200).json(null)
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
})

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { // 서버 에러
            console.error(err);
            return next(err);
        }
        if (info) { // 클라이언트 에러 (로그인 실패)
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (loginErr) => {
            if (loginErr) { // passport 에러
                console.error(loginErr)
                return next(loginErr)
            }

            try {
                const userInfo = await getUserInfoWithPost(user.id)
                return res.status(200).json(userInfo);
            } catch (error) {
                console.error(error)
                return next(error)
            }

        })
    })(req, res, next)
})

router.post('/', isNotLoggedIn, async (req, res, next) => {
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

router.post('/logout', isLoggedIn, (req, res, next) => {
    req.logout()
    req.session.destroy()
    req.send('ok')
})

export default router
