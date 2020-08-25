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
            {model: Post},
            {model: User, as: 'Followings'},
            {model: User, as: 'Followers'}
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
