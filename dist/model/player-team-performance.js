'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sequelize = require('Sequelize');

var _Sequelize2 = _interopRequireDefault(_Sequelize);

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PlayerTeamPerformance = _connection2.default.define('player_team_performance', {

  ptp_code: {
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
  id_sl: {
    type: _Sequelize2.default.INTEGER,
    references: {
      model: 'team_sl',
      key: 'id_sl'
    }
  },
  fantasy_points: _Sequelize2.default.DECIMAL,
  order: _Sequelize2.default.INTEGER,
  primary_position: _Sequelize2.default.STRING,
  secondary_position: _Sequelize2.default.STRING,
  minutes_primary: _Sequelize2.default.INTEGER,
  minutes_secondary: _Sequelize2.default.INTEGER
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

exports.default = PlayerTeamPerformance;