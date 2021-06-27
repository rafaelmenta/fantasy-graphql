"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var config = _config["default"].config; // @TODO move out later

Date.prototype.stdTimezoneOffset = function () {
  var jan = new Date(this.getFullYear(), 0, 1);
  var jul = new Date(this.getFullYear(), 6, 1);
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
};

Date.prototype.dst = function () {
  return this.getTimezoneOffset() < this.stdTimezoneOffset();
};

var now = new Date();
var timezone = now.dst() ? '-4:00' : '-5:00';
var Conn = new _sequelize["default"](config.database.name, config.database.login, config.database.password, {
  logging: false,
  benchmark: false,
  host: config.database.host,
  dialect: config.database.dialect,
  timezone: timezone,
  dialectOptions: {
    socketPath: config.database.socketPath,
    multipleStatements: true
  }
});
var _default = Conn;
exports["default"] = _default;