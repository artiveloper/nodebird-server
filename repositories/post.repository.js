import {User, Post, Image, Comment} from '../models'

const findAllPost = async (limit, lastPostId) => {
    return await Post.findAll({
        limit: limit,
        order: [['createdAt', 'DESC']],
        include: [
            {model: User},
            {model: Image},
            {model: Comment, include: [{model: User, attributes: ['id', 'nickname']}]}
        ]
    })
}

const findPost = async (postId) => {
    return await Post.findOne({
        where: {
            id: postId,
        },
        include: [
            {model: Image},
            {model: Comment, include: [{model: User, attributes: ['id', 'nickname']}]},
            {model: User},
        ]
    })
}

const save = async (userId, content) => {
    return await Post.create({
        UserId: userId,
        content
    })
}

const getComment = async (commentId) => {
    return await Comment.findOne({
        where: {
            id: commentId,
        },
        include: [
            {model: User, attributes: ['id', 'nickname']}
        ]
    })
}

const saveComment = async (postId, userId, content) => {
    return await Comment.create({
        PostId: postId,
        UserId: userId,
        content,
    })
}

export {
    findPost,
    findAllPost,
    save,
    getComment,
    saveComment,
}
