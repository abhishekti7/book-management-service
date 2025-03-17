const { GraphQLError } = require("graphql");
const { ApolloServerErrorCode } = require("@apollo/server/errors");

const authorService = require("./author.service");

const authorResolver = {
    Author: {
        books: async (parent) => {
            return await authorService.getAuthorBooks(parent.id);
        },
        metadata: async (parent) => {
            return await authorService.getAuthorMetadata(parent.id);
        },
    },

    Query: {
        authors: async (_, input) => {
            console.log(input);
            return await authorService.getAuthors(input);
        },

        author: async (_, { id }) => {
            return await authorService.getAuthorById(id);
        },
    },
    Mutation: {
        // only admin can create an author
        createAuthor: async (_, { input, metadata }, { user, isAdmin }) => {
            if (!user || !isAdmin) {
                throw new GraphQLError("User is not authorized", {
                    extensions: {
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                    },
                });
            }

            try {
                return await authorService.createAuthor(input, metadata);
            } catch (error) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                    },
                });
            }
        },

        // only admin can update an author
        updateAuthor: async (_, { id, input, metadata }, { user, isAdmin }) => {
            if (!user || !isAdmin) {
                throw new GraphQLError("User is not authorized", {
                    extensions: {
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                    },
                });
            }

            try {
                return await authorService.updateAuthor(id, input, metadata);
            } catch (error) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                    },
                });
            }
        },

        // only admin can update author metadata
        updateAuthorMetadata: async (
            _,
            { id, metadata },
            { user, isAdmin }
        ) => {
            if (!user || !isAdmin) {
                throw new GraphQLError("User is not authorized", {
                    extensions: {
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                    },
                });
            }

            try {
                return await authorService.updateAuthorMetadata(id, metadata);
            } catch (error) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                    },
                });
            }
        },

        // only admin can delete an author
        deleteAuthor: async (_, { id }, { user, isAdmin }) => {
            if (!user || !isAdmin) {
                throw new GraphQLError("User is not authorized", {
                    extensions: {
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                    },
                });
            }

            try {
                return await authorService.deleteAuthor(id);
            } catch (error) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                    },
                });
            }
        },
    },
};

module.exports = authorResolver;
