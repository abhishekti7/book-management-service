const jwt = require('jsonwebtoken');

const logger = require('../utils/logger');

/**
 * generates a jwt token with the given payload
 * @param {*} payload 
 */
const generateToken = async (payload, expiresIn = '1d') => {
    const JWT_SECRET = process.env.JWT_SECRET;

    return new Promise(async (resolve, reject) => {
        try {
            jwt.sign(payload, JWT_SECRET, { expiresIn: expiresIn }, function(err, token) {
                if (err) {
                    logger.error('Error generating jwt token');
                    logger.error(err);
                    return reject(err);
                } 

                return resolve(token);
            });
        } catch (error) {
            logger.error('Error generating jwt token');
            logger.error(error);
            return reject(err);
        }
    });
}

/**
 * validates a jwt token and returns the payload
 * @param {*} token 
 * @returns 
 */
const verifyToken = async (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(token, process.env.JWT_SECRET, function(err, data) {
                if (err) {
                    logger.error('Error validating token');
                    logger.error(err);
                    return resolve(null);
                }
                return resolve(data);
            })
        } catch (error) {
            logger.error('Error validating token');
            logger.error(error);
            return resolve(null);
        }
    })
};

module.exports = {
    generateToken,
    verifyToken,
};