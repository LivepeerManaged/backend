export default () => ({
    jwt: {
        secret: process.env.JWT_SECRET || '123456',
    },
    logging: {
        level: 'trace'
    },
    database: {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'livepeer_managed',
        dropSchema: true,
        synchronize: true,
        migrationsRun: true,
        logging: false,
        cache: false,
    }
});


