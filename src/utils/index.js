const { generateToken, verifyToken } = require('./auth');
const { successHandler, errorHandler } = require('./morgan');

module.exports.logger = require('./logger');
module.exports.generateToken = generateToken;
module.exports.verifyToken = verifyToken;
module.exports.successHandler = successHandler;
module.exports.errorHandler = errorHandler;