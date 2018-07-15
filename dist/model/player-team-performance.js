'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PlayerTeamPerformance = _connection2.default.define('player_team_performance', {

  ptp_code: {
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
  id_sl: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'team_sl',
      key: 'id_sl'
    }
  },
  fantasy_points: _sequelize2.default.FLOAT,
  order: _sequelize2.default.INTEGER,
  primary_position: _sequelize2.default.STRING,
  secondary_position: _sequelize2.default.STRING,
  minutes_primary: _sequelize2.default.INTEGER,
  minutes_secondary: _sequelize2.default.INTEGER
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

exports.default = PlayerTeamPerformance;