export default (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    })

    Post.associate = (db) => {
        db.Post.belongsTo(db.User)
        db.Post.hasMany(db.Comment)
        db.Post.hasMany(db.Post)
        db.Post.belongsToMany(db.HashTag,{through: 'PostHashTag'}) // N:M
        db.Post.belongsToMany(db.User, {through: 'Like', as: 'Liker'}) // 좋아요 누른 사람
        db.Post.belongsTo(Post, {as : 'Retweet'}) // 리트윗
    }

    return Post
}
