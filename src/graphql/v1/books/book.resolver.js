const { Author } = require('../../../db/postgres/models');
const { BookMetadata } = require('../../../db/mongo/models');
const { logger } = require('../../../utils');
const { GraphQLError } = require('graphql');
const { ApolloServerErrorCode } = require('@apollo/server/errors');

const bookService = require('./book.service');

const bookResolver = {
    Book: {
        author: async (parent) => {
            return await Author.findByPk(parent.author_id);
        },

        metadata: async (parent) => {
            try {
                return await BookMetadata.findOne({ book_id: parent.id });
            } catch (error) {
                logger.error(`Error fetching book metadata: ${error}`);
                return null;
            }
        }
    },

    Query: {
        books: async (_, input) => {
            try {
                return await bookService.getBooks(input);
            } catch (error) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                    }
                });
            }
        },
        book: async (_, { id, }) => {
            try {
                return await bookService.getBookById(id);
            } catch (error) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                    }
                });
            }
        },

        bookReviews: async (_, { book_id }) => {
            try {
                return await bookService.getBookReviews(book_id);
            } catch (error) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                    }
                });
            }
        },
    },

    Mutation: {
        createBook: async (_, { input, metadata }, { user }) => {
            if (!user) {
                throw new GraphQLError("User is not authorized", {
                    extensions: {
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                    }
                });
            }

            try {
                return await bookService.createBook(input, metadata);
            } catch (error) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                    }
                });
            }
        },

        updateBook: async (_, { id, input }, { user }) => {
            if (!user) {
                throw new GraphQLError("User is not authorized", {
                    extensions: {
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                    }
                });
            }

            try {
                return await bookService.updateBook(id, input);
            } catch (error) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                    }
                });
            }
        },

        deleteBook: async (_, { id }, { user }) => {
            if (!user) {
                throw new GraphQLError("User is not authorized", {
                    extensions: {
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                    }
                });
            }

            try {
                return await bookService.deleteBook(id);
            } catch (error) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                    }
                });
            }
        },

        createBookReview: async (_, { input }, { user }) => {
            if (!user) {
                throw new GraphQLError("User is not authorized", {
                    extensions: {
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                    }
                });
            }

            try {
                return await bookService.createBookReview(input, user.id);
            } catch (error) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                    }
                });
            }
        },

        updateBookReview: async (_, { id, rating, comment }, { user }) => {
            if (!user) {
                throw new GraphQLError("User is not authorized", {
                    extensions: {
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                    }
                });
            }

            try {
                return await bookService.updateBookReview(id, { rating, comment }, user.id);
            } catch (error) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                    }
                });
            }
        },

        deleteBookReview: async (_, { id }, { user }) => {
            if (!user) {
                throw new GraphQLError("User is not authorized", {
                    extensions: {
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                    }
                });
            }

            try {
                return await bookService.deleteBookReview(id, user.id);
            } catch (error) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                    }
                });
            }
        }
    }
}

module.exports = bookResolver;