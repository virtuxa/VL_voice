require('dotenv').config();

const config = {
    port: process.env.PORT || 3000,
    db: {
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'VL_voice',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '159',
        port: process.env.DB_PORT || '5432',
    },
    jwtSecret: process.env.JWT_SECRET || 'supersecretkey'
};

module.exports = config;