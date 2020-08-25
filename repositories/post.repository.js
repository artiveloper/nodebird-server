import {Post} from '../models'

const findPost = async (postId) => {
    return await Post.findOne({
        where : {
            postId
        }
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
