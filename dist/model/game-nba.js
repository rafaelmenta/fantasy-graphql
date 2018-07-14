'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GameNba = _connection2.default.define('game_nba', {
  id_game_nba: {
    type: _sequelize2.default.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_away: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'team_nba',
      key: 'id_nba'
    }
  },
  id_home: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'team_nba',
      key: 'id_nba'
    }
  },
  id_round_away: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'round',
      key: 'id_round'
    }
  },
  id_round_home: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'round',
      key: 'id_round'
    }
  },
  game_time: {
    type: _sequelize2.default.DATE
  },
  is_finished: _sequelize2.default.BOOLEAN,
  external_id: _sequelize2.default.STRING
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

exports.default = GameNba;