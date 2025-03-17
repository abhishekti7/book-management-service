const { Op, where } = require("sequelize");
const { Author, Book } = require("../../../db/postgres/models");
const { AuthorMetadata } = require("../../../db/mongo/models");
const { logger } = require("../../../utils");

class AuthorService {
    /**
     * Get all authors
     * @param {*} param0
     */
    async getAuthors({
        page = 1,
        limit = 10,
        filter = {},
        sortBy = "createdAt",
        order = "DESC",
    }) {
        try {
            const whereConditions = this.buildFilterConditions(filter);

            const offset = (page - 1) * limit;

            const count = await Author.count({ where: whereConditions });

            const authors = await Author.findAll({
                where: whereConditions,
                order: [[sortBy, order]],
                limit,
                offset,
            });

            return {
                authors,
                total: count,
                page,
                hasMore: authors.length >= limit,
            };
        } catch (error) {
            logger.error(error);
            throw new Error(`Error fetching authors: ${error.message}`);
        }
    }

    /**
     * finds author with primary key
     * @param {*} id must be primary key
     * @returns
     */
    async getAuthorById(id) {
        try {
            return await Author.findByPk(id);
        } catch (error) {
            logger.error(error);
            throw new Error(`Error fetching author: ${error.message}`);
        }
    }

    /**
     * create a new author
     * @param {*} authorData
     * @returns
     */
    async createAuthor(authorData, metadata) {
        try {
            const author = await Author.create({
                ...authorData,
                date_of_birth: new Date(authorData.date_of_birth),
            });

            // create metadata record if present
            if (metadata) {
                await AuthorMetadata.insertOne({
                    author_id: author.id,
                    ...metadata,
                });
            }

            return author;
        } catch (error) {
            logger.error(error);
            throw new Error(`Error creating new author: ${error.message}`);
        }
    }

    /**
     * updates an author
     * @param {*} id
     * @param {*} updateData
     * @param {*} metadata
     * @returns
     */
    async updateAuthor(id, updateData, metadata) {
        try {
            const author = await Author.findByPk(id);

            if (!author) {
                throw new Error("Author not found!");
            }

            const result = await Author.update(updateData, {
                where: {
                    id: id,
                },
                returning: true,
                plain: true,
            });

            // check and update author metadata
            if (metadata) {
                // check if metadata record is already present
                const existingMetadata = await AuthorMetadata.findOne({
                    author_id: id,
                });

                // if already present, update existing record
                if (existingMetadata) {
                    await AuthorMetadata.updateOne(
                        {
                            author_id: id,
                        },
                        {
                            ...metadata,
                        }
                    );
                } else {
                    // if not present, create new record
                    await AuthorMetadata.insertOne({
                        author_id: id,
                        ...metadata,
                    });
                }
            }

            return result[1];
        } catch (error) {
            logger.error(error);
            throw new Error(`Error updating author: ${error.message}`);
        }
    }

    /**
     * deletes an author
     * @param {*} id
     * @returns
     */
    async deleteAuthor(id) {
        try {
            const author = await Author.findByPk(id);

            if (!author) {
                throw new Error(`Author not found`);
            }

            // delete all books associated with this author.
            // ideally we will send a message to a messaging queue here
            // to defer deletion of book and author metadata to a later time
            await Book.destroy({
                where: {
                    author_id: id,
                },
            });

            await Author.destroy({
                where: {
                    id: id,
                },
            });

            return true;
        } catch (error) {
            logger.error(error);
            throw new Error(`Error deleting author: ${error.message}`);
        }
    }

    /**
     * fetches author metadata from mongo
     * @param {*} authorId
     * @returns AuthorMetadata
     */
    async getAuthorMetadata(authorId) {
        try {
            return await AuthorMetadata.findOne({ author_id: authorId });
        } catch (error) {
            logger.error(error);
            throw new Error(`Error fetching author metadata: ${error.message}`);
        }
    }

    /**
     * updates metadata for an author, will create new record if metadata does
     * not exist
     * @param {*} authorId
     * @param {*} metadata
     * @returns
     */
    async updateAuthorMetadata(authorId, updateMetadata) {
        try {
            const author = await Author.findByPk(authorId);

            if (!author) {
                throw new Error("Author not found");
            }

            let metadata = await AuthorMetadata.findOne({
                author_id: authorId,
            });

            if (!metadata) {
                metadata = await AuthorMetadata.create({
                    author_id: authorId,
                    ...metadata,
                });
            } else {
                await AuthorMetadata.updateOne(
                    { author_id: authorId },
                    {
                        ...updateMetadata,
                    }
                );

                metadata = await AuthorMetadata.findOne({
                    author_id: authorId,
                });
            }

            return metadata;
        } catch (error) {
            logger.error(error);
            throw new Error(`Error updating author metadata: ${error.message}`);
        }
    }

    /**
     * get all the books by an author
     * @param {*} authorId
     * @returns
     */
    async getAuthorBooks(authorId) {
        try {
            return await Book.findAll({
                where: {
                    author_id: authorId,
                },
            });
        } catch (error) {
            logger.error(error);
            throw new Error(`Error fetching books ${error.message}`);
        }
    }

    buildFilterConditions(filters) {
        const whereConditions = {};

        if (filters.name) {
            // like query on author name
            whereConditions.name = { [Op.iLike]: `%${filters.name}%` };
        }

        if (filters.born_after) {
            whereConditions.date_of_birth = {
                ...whereConditions.date_of_birth,
                [Op.gt]: new Date(filters.born_after),
            };
        }

        if (filters.born_before) {
            whereConditions.date_of_birth = {
                ...whereConditions.date_of_birth,
                [Op.lt]: new Date(filters.born_before),
            };
        }

        if (filters.search) {
            whereConditions[Op.or] = [
                { name: { [Op.iLike]: `%${filters.search}%` } },
                { biography: { [Op.iLike]: `%${filters.search}%` } },
            ];
        }

        return whereConditions;
    }
}

module.exports = new AuthorService();
