const userService = require("./user.service");

const userResolvers = {
    Query: {
        me: async (_, __, { user }) => {
            if (!user) return null;

            return user;
        },
    },
    Mutation: {
        register: async (_, { input }) => {
            return await userService.register(input);
        },

        login: async (_, { input }) => {
            return await userService.login(input);
        },
    },
};

module.exports = userResolvers;
