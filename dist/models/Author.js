"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var authorSchema = _mongoose["default"].Schema({
  id: {
    type: String,
    required: true
  }
});
module.exports = _mongoose["default"].model('Author', authorSchema);