"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeDefs = void 0;
var typeDefs = exports.typeDefs = "#graphql\n    # this \"Book\" type defines the queryable fields for every book in our data source\n    type Book {\n        title: String!\n        author: String!\n\n    }\n    # the \"Query\" type is special: it lists all the available queries that \n    # clients can execute, along with the return type for each. In this case,\n    # the \"books\" query returns an array of zero or more Books\n    type Query {\n        books: [Book]\n    }\n";