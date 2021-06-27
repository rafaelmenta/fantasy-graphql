"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _connection = _interopRequireDefault(require("../../database/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TeamStats = _connection["default"].define('team_stats', {
  id_sl: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    references: {
      model: 'team_sl',
      key: 'id_sl'
    }
  },
  id_season: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    references: {
      model: 'season',
      key: 'id_season'
    }
  },
  minutes_pg: _sequelize["default"].INTEGER,
  minutes_sg: _sequelize["default"].INTEGER,
  minutes_sf: _sequelize["default"].INTEGER,
  minutes_pf: _sequelize["default"].INTEGER,
  minutes_c: _sequelize["default"].INTEGER,
  fantasy_points: _sequelize["default"].DECIMAL
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

var _default = TeamStats;
exports["default"] = _default;