export default {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "123456",
    "database": "livepeer_managed",
    "dropSchema": false,
    "entities": ["./src/**/entities/*.js"],
    "migrations": ["./src/**/migrations/*.js"],
    "synchronize": true,
    "migrationsRun": true,
    "logging": false,
    "cache": true
}
