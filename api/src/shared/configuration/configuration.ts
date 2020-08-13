export default () => ({
    // App configuration
    port: parseInt(process.env.APP_PORT, 10) || 3131,

    // JWT configuration
    jwt: {
        token: process.env.JWT_TOKEN,
        accessTokenTtl: process.env.JWT_ACCESS_TOKEN_TTL,
        refreshTokenTtl: parseInt(process.env.JWT_REFRESH_TOKEN_TTL, 10) || 15,
    }
});
