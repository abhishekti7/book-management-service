const { sequelize } = require('./models');

const connectPostgres = async () => {
    if (!sequelize) {
        throw new Error('Error connecting to Postgres');
    }
    return new Promise(async (resolve, reject) => {
        try {
            await sequelize.authenticate();
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = connectPostgres;