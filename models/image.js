export default (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {
        src: {
            type: DataTypes.STRING(200),
            allowNull: false,
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci'
    })

    Image.accosicate = (db) => {
        db.Image.belongsTo(db.Post)
    }

    return Image
}
