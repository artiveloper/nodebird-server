import Sequelize from 'sequelize'
import databaseConfig from '../config/config.json'

const env = process.env.NODE_ENV || 'development'

const dbConfig = databaseConfig[env]
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig)

const db = {}
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
