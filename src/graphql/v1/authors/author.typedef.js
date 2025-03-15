const authorTypeDef = `#graphql
    type Author {
        id: ID!
        name: String!
        biography: String
        date_of_birth: String
        books: [Book]
        metadata: AuthorMetadata
        createdAt: String!
        updatedAt: String!
    }

    type AuthorMetadata {
        author_id: ID!
        social_media: SocialMedia
        nationality: String
        languages: [String]
        last_updated: String
    }

    type SocialMedia {
        twitter: String
        facebook: String
        instagram: String
        website: String
    }

    type PaginatedAuthors {
        authors: [Author]!
        total: Int!
        page: Int!
        hasMore: Boolean!
    }

    input AuthorInput {
        name: String!
        biography: String
        date_of_birth: String
    }

    input AuthorMetadataInput {
        social_media: SocialMediaInput
        nationality: String
        languages: String
    }

    input AuthorUpdateInput {
        name: String
        biography: String
        date_of_birth: String
    }

    input SocialMediaInput {
        twitter: String
        facebook: String
        instagram: String
        website: String
    }

    input AuthorFilterInput {
        name: String
        born_after: String
        born_before: String
        search: String
    }

    type Query {
        authors(
            page: Int
            limit: Int
            filter: AuthorFilterInput
            sortBy: String
            order: String
        ): PaginatedAuthors!

        author(id: ID!): Author
    }

    type Mutation {
        createAuthor(input: AuthorInput!, metadata: AuthorMetadataInput): Author!
        updateAuthor(id: ID!, input: AuthorUpdateInput!): Author!
        updateAuthorMetadata(id: ID!, metadata: AuthorMetadataInput!): AuthorMetadata!
        deleteAuthor(id: ID!): Boolean!
    }
`;

module.exports = authorTypeDef;