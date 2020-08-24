import {User} from '../models';

const findByEmail = async (email) => {
    return await User.findOne({
        where: {
            email
        }
    })
}

const save = async (email, nickname, hashedPassword) => {
    await User.create({
        email,
        nickname,
        password: hashedPassword
    })
}

export {
    findByEmail,
    save
}
