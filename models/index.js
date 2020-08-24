import Sequelize from 'sequelize'
import databaseConfig from '../config/config.json'

import UserModel from './user'
import PostModel from './post'
import ImageModel from './image'
import HashTagModel from './hashtag'
import CommentModel from './comment'

const env = process.env.NODE_ENV || 'development'

const dbConfig = databaseConfig[env]
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig)

const db = {}
db.User = UserModel(sequelize, Sequelize)
db.Post = PostModel(sequelize, Sequelize)
db.Image = ImageModel(sequelize, Sequelize)
db.HashTag = HashTagModel(sequelize, Sequelize)
db.Comment = CommentModel(sequelize, Sequelize)

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
