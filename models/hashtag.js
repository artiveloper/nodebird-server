export default (sequelize, DataTypes) => {
    const HashTag = sequelize.define('HashTag', {
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        }
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    })

    HashTag.accosicate = (db) => {
        db.HashTag.belongsToMany(db.Post) // N:M
    }

    return HashTag
}
