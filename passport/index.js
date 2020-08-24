import passport from 'passport'
import local from './local'
import {
    findById
} from '../repositories/user.repository'

export default () => {
    passport.serializeUser((user, done) => { // 서버쪽에 [{ id: 1, cookie: 'clhxy' }]
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await findById(id)
            done(null, user)
        } catch (error) {
            console.error(error)
            done(error)
        }
    })

    local()
};

// 프론트에서 서버로는 cookie만 보내요(clhxy)
// 서버가 쿠키파서, 익스프레스 세션으로 쿠키 검사 후 id: 1 발견
// id: 1이 deserializeUser에 들어감
// req.user로 사용자 정보가 들어감

// 요청 보낼때마다 deserializeUser가 실행됨(db 요청 1번씩 실행)
// 실무에서는 deserializeUser 결과물 캐싱
