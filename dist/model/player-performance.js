'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PlayerPerformance = _connection2.default.define('player_performance', {

  id_player_performance: {
    type: _sequelize2.default.INTEGER,
    primaryKey: true
  },
  id_player: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'player',
      key: 'id_player'
    }
  },
  id_round: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'round',
      key: 'id_round'
    }
  },
  minutes: _sequelize2.default.INTEGER,
  field_goal_attempts: _sequelize2.default.INTEGER,
  free_throw_attempts: _sequelize2.default.INTEGER,
  points: _sequelize2.default.INTEGER,
  defensive_rebounds: _sequelize2.default.INTEGER,
  offensive_rebounds: _sequelize2.default.INTEGER,
  assists: _sequelize2.default.INTEGER,
  steals: _sequelize2.default.INTEGER,
  blocks: _sequelize2.default.INTEGER,
  turnovers: _sequelize2.default.INTEGER,
  personal_fouls: _sequelize2.default.INTEGER,
  win_loss: _sequelize2.default.INTEGER,
  fantasy_points: _sequelize2.default.DECIMAL
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

exports.default = PlayerPerformance;