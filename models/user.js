export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
        },
        nickname: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci'
    })

    User.accosicate = (db) => {
        db.User.hasMany(db.Post)
        db.User.hasMany(db.Comment)
        db.User.belongsToMany(db.Post, {through: 'Like', as: 'Liked'}) // 좋아요 한 게시글
        db.User.belongsToMany(db.User, {through: 'Follow', as: 'Followers', foreignKey: 'FollowingId'}) // 팔로워들
        db.User.belongsToMany(db.User, {through: 'Follow', as: 'Followings', foreignKey: 'FollowerId'}) // 팔로윙들
    }

    return User
}
