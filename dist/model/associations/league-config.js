"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _connection = _interopRequireDefault(require("../../database/connection"));

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var LeagueConfig = _connection["default"].define('league_config', {
  id_config: {
    type: _sequelize["default"].STRING,
    primaryKey: true
  },
  id_league: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    references: {
      model: 'league',
      key: 'id_league'
    }
  },
  config_value: _sequelize["default"].STRING
}, {
  freezeTableName: true,
  updatedAt: false,
  createdAt: false
});

var _default = LeagueConfig;
exports["default"] = _default;