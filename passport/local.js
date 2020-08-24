import passport from 'passport'
const { Strategy: LocalStrategy } = require('passport-local');
import bcrypt from 'bcrypt'
import {findByEmail} from '../repositories/user.repository'

export default () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            const user = await findByEmail(email)

            if (!user) {
                // 서버에러, 성공여부, 실패이유
                return done(null, false, {reason: '존재하지 않는 사용자입니다.'})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (isMatch) {
                return done(null, user)
            }

            return done(null, false, {reason: '비밀번호가 일치하지 않습니다.'})
        } catch (error) {
            console.log(error)
            return done(error)
        }
    }))
}
