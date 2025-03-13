const path = require('path');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');

const typesArray = loadFilesSync(path.join(__dirname, './**/*.typedef.js'));
const resolversArray = loadFilesSync(path.join(__dirname, './**/*.resolver.js'));

module.exports.typeDefs = mergeTypeDefs(typesArray);
module.exports.resolvers = mergeResolvers(resolversArray);