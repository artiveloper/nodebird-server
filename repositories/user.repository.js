import {User, Post} from '../models';

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

const getUserInfoWithPost = async (id) => {
    return await User.findOne({
        where: {
            id
        },
        attributes: {
            exclude: 'password'
        },
        include: [
            {model: Post, attributes: ['id']},
            {model: User, as: 'Followings', attributes: ['id']},
            {model: User, as: 'Followers', attributes: ['id']}
        ]
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
    getUserInfoWithPost,
    save
}
