import dotenv from 'dotenv'

dotenv.config()

export default {
    "development": {
        "username": "root",
        "password": process.env.DB_PASSWORD,
        "database": "NODEBIRD",
        "host": "127.0.0.1",
        "port": "3306",
        "dialect": "mysql"
    },
    "test": {
        "username": "root",
        "password": process.env.DB_PASSWORD,
        "database": "NODEBIRD",
        "host": "127.0.0.1",
        "port": "3306",
        "dialect": "mysql"
    },
    "production": {
        "username": "root",
        "password": "password",
        "database": "NODEBIRD",
        "host": "127.0.0.1",
        "port": "3306",
        "dialect": "mysql"
    }
}
