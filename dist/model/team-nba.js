"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _connection = _interopRequireDefault(require("../database/connection"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var _userTeam = _interopRequireDefault(require("./associations/user-team"));

var _user = _interopRequireDefault(require("./user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TeamNba = _connection["default"].define('team_nba', {
  id_nba: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  city: _sequelize["default"].STRING,
  nickname: _sequelize["default"].STRING,
  symbol: _sequelize["default"].STRING,
  primary_color: _sequelize["default"].STRING,
  secondary_color: _sequelize["default"].STRING,
  slug: _sequelize["default"].STRING
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

var _default = TeamNba;
exports["default"] = _default;