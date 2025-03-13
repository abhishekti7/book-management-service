"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _winston = _interopRequireDefault(require("winston"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var enumerateErrorFormat = _winston["default"].format(function (info) {
  if (info instanceof Error) {
    Object.assign(info, {
      message: info.stack
    });
  }
  return info;
});
var logger = _winston["default"].createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: _winston["default"].format.combine(enumerateErrorFormat(), process.env.NODE_ENV === 'development' ? _winston["default"].format.colorize() : _winston["default"].format.uncolorize(), _winston["default"].format.splat(), _winston["default"].format.printf(function (_ref) {
    var level = _ref.level,
      message = _ref.message;
    return "".concat(level ? level : 'info', ": ").concat(message);
  })),
  transports: [new _winston["default"].transports.Console({
    stderrLevels: ['error']
  })]
});
var _default = exports["default"] = logger;