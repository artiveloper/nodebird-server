export default (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    })

    Comment.associate = (db) => {
        db.Post.belongsTo(db.User)
        db.Post.belongsTo(db.Post)
    }

    return Comment
}
