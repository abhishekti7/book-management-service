const { GraphQLError } = require('graphql');
const { ApolloServerErrorCode } = require('@apollo/server/errors');

const authorService = require('./author.service');

const authorResolver = {
    Author: {
        books: async (parent) => {
            return await authorService.getAuthorBooks(parent.id);
        },
        metadata: async (parent) => {
            return await authorService.getAuthorMetadata(parent.id);
        }
    },

    Query: {
        authors: async (_, input) => {
            return await authorService.getAuthors(input);
        },

        author: async (_, id) => {
            return await authorService.getAuthorById(id);
        }
        
    },
    Mutation: {
        createAuthor: async (_, { input, metadata }, { user }) => {
            if (!user) {
                throw new GraphQLError("User is not authorized", {
                    extensions: {
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                    }
                });
            }

            try {
                return await authorService.createAuthor(input, metadata)
            } catch (error) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                    }
                });
            }
        },

        updateAuthor: async (_, { id, input }, { user }) => {
            if (!user) {
                throw new GraphQLError("User is not authorized", {
                    extensions: {
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                    }
                });
            }

            try {
                return await authorService.updateAuthor(id, input);
            } catch (error) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                    }
                })
            }
        },
        
        updateAuthorMetadata: async (_, { id, metadata }, { user }) => {
            if (!user) {
                throw new GraphQLError("User is not authorized", {
                    extensions: {
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                    }
                });
            }

            try {
                return await authorService.updateAuthorMetadata(id, metadata);
            } catch (error) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                    }
                });
            }
        },

        deleteAuthor: async (_, { id }, { user }) => {
            if (!user) {
                throw new GraphQLError("User is not authorized", {
                    extensions: {
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                    }
                });
            }

            try {
                return await authorService.deleteAuthor(id);
            } catch (error) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                    }
                });
            }
        }
    }
};

module.exports = authorResolver;