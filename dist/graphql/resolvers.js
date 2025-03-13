"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = void 0;
// Resolvers define how to fetch the types defined in your schema
var resolvers = exports.resolvers = {
  Query: {
    books: function books() {
      return _books;
    }
  }
};
var _books = [{
  title: 'The Awakening',
  author: 'Kate Chopin'
}, {
  title: 'City of Glass',
  author: 'Paul Auster'
}];