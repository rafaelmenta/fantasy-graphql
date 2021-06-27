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

var TeamSl = _connection["default"].define('team_sl', {
  id_sl: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  league_id: _sequelize["default"].INTEGER,
  city: _sequelize["default"].STRING,
  nickname: _sequelize["default"].STRING,
  symbol: _sequelize["default"].STRING,
  primary_color: _sequelize["default"].STRING,
  secondary_color: _sequelize["default"].STRING,
  id_division: _sequelize["default"].INTEGER,
  slug: _sequelize["default"].STRING
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true // Model tableName will be the same as the model name

});

var _default = TeamSl;
exports["default"] = _default;