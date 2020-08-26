import {User, Post, Image, Comment} from '../models'

const findPost = async (postId) => {
    return await Post.findOne({
        where : {
            postId
        },
        include: [
            {model: Image},
            {model: Comment},
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

const saveComment = async (postId, content) => {
    return await Comment.create({
        PostId: postId,
        content,
    })
}

export {
    findPost,
    save,
    saveComment,
}
