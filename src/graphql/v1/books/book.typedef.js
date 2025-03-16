const bookSchema = `#graphql
    type Book {
        id: ID!
        title: String!
        description: String!
        published_date: String!
        author_id: ID!
        author: Author
        metadata: BookMetadata
        createdAt: String!
        updatedAt: String!
    }

    type BookMetadata {
        book_id: ID!
        genres: [String]
        tags: [String]
        average_rating: Float
        ratings_count: Int
        page_count: Int
        language: String
        last_updated: String
    }

    type Review {
        id: ID!
        book_id: ID!
        user_id: ID!
        rating: Int!
        comment: String
        created_at: String!
    }

    type PaginatedBooks {
        books: [Book]!
        total: Int!
        page: Int!
        hasMore: Boolean!
    }

    input BookInput {
        title: String!
        description: String
        published_date: String
        author_id: ID!
    }

    input BookUpdateInput {
        title: String
        description: String
        published_date: String
        author_id: ID
    }

    input BookMetadataInput {
        genres: [String]
        tags: [String]
        page_count: Int
        language: String
    }

    input ReviewInput {
        book_id: ID!
        rating: Int!
        comment: String
    }

    input BookFilterInput {
        title: String
        author_id: ID
        published_after: String
        published_before: String
        search: String
    }

    type Query {
        books(
            page: Int
            limit: Int
            filter: BookFilterInput
            sortBy: String
            order: String
        ): PaginatedBooks!
        
        book(id: ID!): Book

        bookReviews(book_id: ID!): [Review]!
    }

    type Mutation {
        createBook(input: BookInput!, metadata: BookMetadataInput): Book!
        updateBook(id: ID!, input: BookUpdateInput!): Book!
        deleteBook(id: ID!): Boolean!
        createBookReview(input: ReviewInput!): Review!
        updateBookReview(id: ID!, rating: Int, comment: String): Review!
        deleteBookReview(id: ID!): Boolean!
    }
`;

module.exports = bookSchema;
