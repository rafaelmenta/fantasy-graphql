"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _connection = _interopRequireDefault(require("../../database/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PlayerStats = _connection["default"].define('player_stats', {
  id_player: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    references: {
      model: 'player',
      key: 'id_player'
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
  games: _sequelize["default"].INTEGER,
  minutes: _sequelize["default"].INTEGER,
  field_goal_attempts: _sequelize["default"].INTEGER,
  free_throw_attempts: _sequelize["default"].INTEGER,
  points: _sequelize["default"].INTEGER,
  defensive_rebounds: _sequelize["default"].INTEGER,
  offensive_rebounds: _sequelize["default"].INTEGER,
  assists: _sequelize["default"].INTEGER,
  steals: _sequelize["default"].INTEGER,
  blocks: _sequelize["default"].INTEGER,
  turnovers: _sequelize["default"].INTEGER,
  personal_fouls: _sequelize["default"].INTEGER,
  fantasy_points: _sequelize["default"].DECIMAL
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

var _default = PlayerStats;
exports["default"] = _default;