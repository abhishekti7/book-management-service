"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var bookSchema = _mongoose["default"].Schema({
  id: {
    type: String,
    required: true
  },
  rating: {
    type: Number
  }
});
module.exports = _mongoose["default"].model('Book', bookSchema);