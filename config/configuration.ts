export default () => ({
    jwtSecret: process.env.JWT_SECRET || '123456'
});
