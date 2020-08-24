import {User} from '../models';

const findByEmail = async (email) => {
    return await User.findOne({
        where: {
            email
        }
    })
}

const findById = async (id) => {
    return await User.findOne({
        where: {
            id
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
    findById,
    save
}
