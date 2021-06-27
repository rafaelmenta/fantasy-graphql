"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _connection = _interopRequireDefault(require("../database/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var League = _connection["default"].define('league', {
  id_league: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  name: _sequelize["default"].STRING,
  symbol: _sequelize["default"].STRING,
  id_owner: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'user',
      key: 'id_user'
    }
  },
  id_type: _sequelize["default"].INTEGER,
  number_of_teams: _sequelize["default"].INTEGER
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

var _default = League;
exports["default"] = _default;