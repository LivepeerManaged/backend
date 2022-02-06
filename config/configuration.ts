export default () => ({
    jwtSecret: process.env.JWT_SECRET || '123456',
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
        logging: true,
        cache: false,
    }
    //TODO add loglevel
});
