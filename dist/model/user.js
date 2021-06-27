"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _connection = _interopRequireDefault(require("../database/connection"));

var _userTeam = _interopRequireDefault(require("./associations/user-team"));

var _teamSl = _interopRequireDefault(require("./team-sl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var User = _connection["default"].define('user', {
  id_user: {
    autoIncrement: true,
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  first_name: _sequelize["default"].STRING,
  last_name: _sequelize["default"].STRING,
  nickname: _sequelize["default"].STRING,
  email: _sequelize["default"].STRING,
  login: _sequelize["default"].STRING,
  password: _sequelize["default"].STRING,
  id_permission: _sequelize["default"].INTEGER
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true // Model tableName will be the same as the model name

});

var _default = User;
exports["default"] = _default;