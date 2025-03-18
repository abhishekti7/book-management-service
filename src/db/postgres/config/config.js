require("dotenv").config({
    path: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
});

module.exports = {
    development: {
        use_env_variable: "DATABASE_URL",
        dialect: "postgres",
        keepAlive: true,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    },
    test: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "postgres",
    },
    production: {
        use_env_variable: "DATABASE_URL",
        dialect: "postgres",
        keepAlive: true,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    },
};
