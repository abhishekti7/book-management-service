const connectMongodb = require('./mongo/connectMongodb');
const connectPostgres = require('./postgres/connectPostgres');
const { logger } = require('../utils');

const connectDb = async () => {
    logger.info('Connecting mongodb...');
    await connectMongodb();

    logger.info('Mongodb connected successfully');
    
    logger.info('Connecting postgres...');
    await connectPostgres();

    logger.info('Postgres connected successfully');
}

module.exports = connectDb;