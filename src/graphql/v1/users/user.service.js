const { ApolloServerErrorCode } = require("@apollo/server/errors");
const { GraphQLError } = require("graphql");

const { User } = require("../../../db/postgres/models");
const { generateToken, logger, verifyToken } = require("../../../utils");

class UserService {
    /**
     * Create a new user, check if email already exists, return authToken
     * @param {*} input
     * @returns
     */
    async register(input) {
        const { first_name, last_name, email, password } = input;
        const existingUser = await User.findOne({
            where: {
                email: email,
            },
        });

        logger.info(`Existing User: ${existingUser}`);

        if (existingUser) {
            throw new GraphQLError("Email already registered", {
                extensions: {
                    code: ApolloServerErrorCode.BAD_REQUEST,
                },
            });
        }

        try {
            const user = await User.create({
                first_name,
                last_name,
                email,
                password,
            });

            logger.info(`New User created`);

            const authToken = await generateToken(user.toJSON());

            return {
                token: authToken,
                user,
            };
        } catch (error) {
            console.log(error);
            throw new GraphQLError("Internal service error", {
                extensions: {
                    code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                },
            });
        }
    }

    async login(input) {
        console.log("loggin in");
        const { email, password } = input;
        console.log(email, password);
        const user = await User.findOne({ where: { email } });
        console.log(user);
        if (!user) {
            throw new GraphQLError("User does not exist", {
                extensions: {
                    code: ApolloServerErrorCode.BAD_REQUEST,
                },
            });
        }

        const isPasswordValid = await user.validatePassword(password);
        logger.info("User has been validated");

        if (!isPasswordValid) {
            throw new GraphQLError("Invalid email or password", {
                extensions: {
                    code: ApolloServerErrorCode.BAD_USER_INPUT,
                },
            });
        }

        const authToken = await generateToken(user.toJSON());

        return {
            token: authToken,
            user,
        };
    }
}

module.exports = new UserService();
