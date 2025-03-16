const userTypeDef = `#graphql
    type User {
        id: ID!
        first_name: String!
        last_name: String
        email: String!
        createdAt: String!
        updatedAt: String!
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    input RegisterInput {
        first_name: String!
        last_name: String
        email: String!
        password: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    type Query {
        me: User
        users: [User]!
        user(id: ID): User
    }
    
    type Mutation {
        register(input: RegisterInput!): AuthPayload!
        login(input: LoginInput!): AuthPayload!
    }
`;

module.exports = userTypeDef;
