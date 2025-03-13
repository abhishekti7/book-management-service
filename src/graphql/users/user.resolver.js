const { GraphQLError } = require('graphql');
const { User } = require('../../db/postgres/models/user');
const { generateToken } = require('../../utils/auth');

const { ApolloServerErrorCode } = require('@apollo/server/errors');

const userResolvers = {
    Query: {
        me: async (_, __, { user, isAuth }) => {
            if (!user) return null;

            return user;
        },
    },
    Mutation: {
        register: async (_, { input }) => {
            const { first_name, last_name, email, password } = input;

            const existingUser = await User.findOne({
                where: {
                    email: email,
                }
            });

            if (existingUser) {
                throw new GraphQLError('Email already registered', {
                    extensions: {
                        code: ApolloServerErrorCode.BAD_REQUEST
                    }
                });
            }

            try {
                const user = await User.create({
                    first_name,
                    last_name,
                    email,
                    password,
                });

                const authToken = await generateToken(user);

                return {
                    token: authToken,
                    user,
                }
            } catch (error) {
                throw new GraphQLError('Internal service error', {
                    extensions: {
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR
                    }
                });
            }
        },

        login: async (_, { input }) => {
            const { email, password } = input;

            const user = await User.findOne({ where: { email }});

            if (!user) {
                throw new GraphQLError('User does not exist', {
                    extensions: {
                        code: ApolloServerErrorCode.BAD_REQUEST,
                    }
                });
            }

            const isPasswordValid = await user.validatePassword(password);

            if (!isPasswordValid) {
                throw new GraphQLError('Invalid email or password', {
                    extensions: {
                        code: ApolloServerErrorCode.BAD_USER_INPUT
                    }
                });
            }

            const authToken = await generateToken(user);

            return {
                token: authToken,
                user,
            };
        }

    }
}

module.exports = userResolvers;