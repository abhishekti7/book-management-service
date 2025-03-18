const moment = require("moment");
const { Book, Author } = require("../../../db/postgres/models");
const { BookMetadata, Review } = require("../../../db/mongo/models");

const { Op } = require("sequelize");
const { logger } = require("../../../utils");

class BookService {
    /**
     * gets all books based on filters
     * @param {*} param0
     * @returns
     */
    async getBooks({
        page = 1,
        limit = 10,
        filter = {},
        sortBy = "createdAt",
        order = "DESC",
    }) {
        try {
            const whereConditions = this.buildWhereConditions(filter);

            const offset = (page - 1) * limit;

            const count = await Book.count({ where: whereConditions });

            let books = [];

            if (count > 0) {
                books = await Book.findAll({
                    where: whereConditions,
                    order: [[sortBy, order]],
                    limit,
                    offset,
                });
            }

            return {
                books,
                total: count,
                page,
                hasMore: books.length === limit,
            };
        } catch (error) {
            logger.error(error);
            throw new Error(`Error fetching books: ${error.message}`);
        }
    }

    /**
     * fetches book by id
     * @param {*} id
     * @returns
     */
    async getBookById(id) {
        try {
            return await Book.findByPk(id);
        } catch (error) {
            logger.error(error);
            throw new Error(`Error fetching book: ${error.message}`);
        }
    }

    /**
     * creates a new book and adds metadata
     * @param {*} bookData
     * @param {*} metaData
     * @returns
     */
    async createBook(bookData, metaData) {
        try {
            if (!bookData.author_id) {
                throw new Error("Invalid input");
            }

            const author = await Author.findByPk(bookData.author_id);

            if (!author) {
                throw new Error("Author not found");
            }

            const book = await Book.create(bookData);

            if (metaData) {
                const existingMetadata = await BookMetadata.findOne({
                    book_id: book.id,
                });

                if (existingMetadata) {
                    await BookMetadata.updateOne(
                        {
                            book_id: book.id,
                        },
                        {
                            ...metaData,
                        }
                    );
                } else {
                    await BookMetadata.create({
                        book_id: book.id,
                        ...metaData,
                    });
                }
            }

            return book;
        } catch (error) {
            logger.error(error);
            throw new Error(`Error creating book: ${error.message}`);
        }
    }

    /**
     * updates book given book id
     * @param {*} id
     * @param {*} bookData
     * @returns
     */
    async updateBook(id, bookData, metadata) {
        try {
            const book = await Book.findByPk(id);

            if (!book) {
                throw new Error("Book not found");
            }

            if (bookData.author_id) {
                const author = await Author.findByPk(bookData.author_id);

                if (!author) {
                    throw new Error("Author not found");
                }
            }

            const result = await Book.update(bookData, {
                where: {
                    id: id,
                },
                returning: true,
                plain: true,
            });

            if (metadata) {
                const existingMetadata = await BookMetadata.findOne({
                    book_id: id,
                });

                if (existingMetadata) {
                    await BookMetadata.updateOne(
                        {
                            book_id: id,
                        },
                        {
                            ...metadata,
                        }
                    );
                } else {
                    await BookMetadata.insertOne({
                        book_id: id,
                        ...metadata,
                    });
                }
            }

            return result[1];
        } catch (error) {
            logger.error(error);
            throw new Error(`Error updating book: ${error.message}`);
        }
    }

    async deleteBook(id) {
        try {
            const book = await Book.findByPk(id);

            if (!book) {
                throw new Error("Book not found");
            }

            await BookMetadata.deleteOne({ book_id: id });
            await Review.deleteMany({ book_id: id });

            await book.destroy({
                where: {
                    id: id,
                },
            });

            return true;
        } catch (error) {
            logger.error(error);
            throw new Error(`Error deleting book: ${error.message}`);
        }
    }

    async updateBookMetdata(id, metadata) {
        try {
            let metadata = await BookMetadata.findOne({ book_id: id });

            if (!metadata) {
                metadata = await BookMetadata.create({
                    book_id: id,
                    ...metadata,
                });
            } else {
                await BookMetadata.updateOne({ book_id: id }, { ...metadata });

                metadata = await BookMetadata.findOne({ book_id: id });
            }

            return metadata;
        } catch (error) {
            logger.error(error);
            throw new Error(`Error updating book metadata: ${error.message}`);
        }
    }

    /**
     * returns all the reviews for the books
     * @param {*} book_id
     */
    async getBookReviews(book_id) {
        try {
            const reviews = await Review.find({ book_id: book_id }, null, {
                sort: { created_at: -1 },
            });

            const formattedReviews = reviews.map((item) => {
                return {
                    ...item.toJSON(),
                    id: item._id.toString(),
                    created_at: moment(item.created_at).format("YYYY-MM-DD"),
                };
            });

            return formattedReviews;
        } catch (error) {
            logger.error(error);
            throw new Error(`Error fetching book reviews: ${error.message}`);
        }
    }

    /**
     * creates a book review
     * @param {*} input
     * @param {*} userId
     * @returns
     */
    async createBookReview(input, userId) {
        try {
            const bookReview = await Review.create({
                ...input,
                user_id: userId,
            });

            return bookReview;
        } catch (error) {
            logger.error(error);
            throw new Error(`Error creating book review: ${error.message}`);
        }
    }

    async updateBookReview(bookId, data, userId) {
        try {
            const review = await Review.findOne({
                user_id: userId,
                book_id: bookId,
            });

            if (!review) {
                throw new Error("Review not found");
            }

            await Review.updateOne(
                { book_id: bookId, user_id: userId },
                { ...data }
            );

            return review;
        } catch (error) {
            logger.error(error);
            throw new Error(`Error updating book review: ${error.message}`);
        }
    }

    async deleteBookReview(bookId, userId) {
        try {
            await Review.deleteOne({
                book_id: bookId,
                user_id: userId,
            });
            return true;
        } catch (error) {
            logger.error(error);
            throw new Error(`Error deleting book review: ${error.message}`);
        }
    }

    buildWhereConditions(filters) {
        const whereConditions = {};

        if (filters.title) {
            whereConditions.title = {
                [Op.iLike]: `%${filters.title}%`,
            };
        }

        if (filters.author_id) {
            whereConditions.author_id = filters.author_id;
        }

        if (filters.published_on) {
            const startDate = moment();
            const endDate = moment();
            startDate.date(1).month(0).year(filters.published_on);
            endDate.date(31).month(11).year(filters.published_on);

            whereConditions.published_date = {
                ...whereConditions.published_date,
                [Op.lte]: endDate,
                [Op.gte]: startDate,
            };
        }

        if (filters.published_before) {
            whereConditions.published_date = {
                ...whereConditions.published_date,
                [Op.lt]: new Date(filters.published_before),
            };
        }

        if (filters.published_after) {
            whereConditions.published_date = {
                ...whereConditions.published_date,
                [Op.gt]: new Date(filters.published_after),
            };
        }

        if (filters.search) {
            whereConditions[Op.or] = [
                { title: { [Op.iLike]: `%${filters.search}%` } },
                { description: { [Op.iLike]: `%${filters.search}%` } },
            ];
        }

        return whereConditions;
    }
}

module.exports = new BookService();
