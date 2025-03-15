const path = require('path');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');

const API_VERSION = process.env.API_VERSION || 'v1';
const typesArray = loadFilesSync(path.join(__dirname, `./${API_VERSION}/**/*.typedef.js`));
const resolversArray = loadFilesSync(path.join(__dirname, `./${API_VERSION}/**/*.resolver.js`));

const typeDefs = mergeTypeDefs(typesArray);
const resolvers = mergeResolvers(resolversArray);

module.exports.typeDefs = typeDefs;
module.exports.resolvers = resolvers;