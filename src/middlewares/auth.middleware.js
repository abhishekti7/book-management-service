const { verifyToken } = require('../utils');
const { User } = require('../db/postgres/models');
const { logger } = require('../utils');

/**
 * 
 * @param {*} req 
 * @returns 
 */
const getUser = async (req) => {
    // get bearer token from the request header
    const authHeader = req?.headers?.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }
    const token = authHeader.split(' ')[1];

    // decode the jwt token 
    const decoded = await verifyToken(token);

    if (!decoded) {
        return null;
    }

    try {
        // get the user from the decoded id
        const user = await User.findByPk(decoded.id);

        return user.toJSON();
    } catch (error) {
        logger.error(error);
        return null;
    }
}

/**
 * 
 * @param {*} param0 
 * @returns 
 */
const authMiddleware = async ({ req }) => {
    const user = await getUser(req);
    
    return { user };
};

module.exports = authMiddleware;