"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _connection = _interopRequireDefault(require("../database/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PlayerTeamPerformance = _connection["default"].define('player_team_performance', {
  ptp_code: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  id_player: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'player',
      key: 'id_player'
    }
  },
  id_round: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'round',
      key: 'id_round'
    }
  },
  id_sl: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'team_sl',
      key: 'id_sl'
    }
  },
  fantasy_points: _sequelize["default"].FLOAT,
  order: _sequelize["default"].INTEGER,
  primary_position: _sequelize["default"].STRING,
  secondary_position: _sequelize["default"].STRING,
  minutes_primary: _sequelize["default"].INTEGER,
  minutes_secondary: _sequelize["default"].INTEGER
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

var _default = PlayerTeamPerformance;
exports["default"] = _default;