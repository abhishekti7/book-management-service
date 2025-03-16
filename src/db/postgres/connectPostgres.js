const { sequelize } = require("./models");
const { logger } = require("../../utils");

const connectPostgres = async () => {
    if (!sequelize) {
        throw new Error("Error connecting to Postgres");
    }
    return new Promise(async (resolve, reject) => {
        try {
            logger.info("authenticating...");
            await sequelize.authenticate();

            logger.info("syncing...");
            await sequelize.sync();

            resolve();
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

module.exports = connectPostgres;
