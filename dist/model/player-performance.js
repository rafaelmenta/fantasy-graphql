'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sequelize = require('Sequelize');

var _Sequelize2 = _interopRequireDefault(_Sequelize);

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PlayerPerformance = _connection2.default.define('player_performance', {

  id_player_performance: {
    type: _Sequelize2.default.INTEGER,
    primaryKey: true
  },
  id_player: {
    type: _Sequelize2.default.INTEGER,
    references: {
      model: 'player',
      key: 'id_player'
    }
  },
  id_round: {
    type: _Sequelize2.default.INTEGER,
    references: {
      model: 'round',
      key: 'id_round'
    }
  },
  minutes: _Sequelize2.default.INTEGER,
  field_goal_attempts: _Sequelize2.default.INTEGER,
  free_throw_attempts: _Sequelize2.default.INTEGER,
  points: _Sequelize2.default.INTEGER,
  defensive_rebounds: _Sequelize2.default.INTEGER,
  offensive_rebounds: _Sequelize2.default.INTEGER,
  assists: _Sequelize2.default.INTEGER,
  steals: _Sequelize2.default.INTEGER,
  blocks: _Sequelize2.default.INTEGER,
  turnovers: _Sequelize2.default.INTEGER,
  personal_fouls: _Sequelize2.default.INTEGER,
  win_loss: _Sequelize2.default.INTEGER,
  fantasy_points: _Sequelize2.default.DECIMAL
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

exports.default = PlayerPerformance;