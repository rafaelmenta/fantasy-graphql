'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sequelize = require('Sequelize');

var _Sequelize2 = _interopRequireDefault(_Sequelize);

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GameNba = _connection2.default.define('game_nba', {
  id_game_nba: {
    type: _Sequelize2.default.INTEGER,
    primaryKey: true
  },
  id_away: {
    type: _Sequelize2.default.INTEGER,
    references: {
      model: 'team_nba',
      key: 'id_nba'
    }
  },
  id_home: {
    type: _Sequelize2.default.INTEGER,
    references: {
      model: 'team_nba',
      key: 'id_nba'
    }
  },
  id_round_away: {
    type: _Sequelize2.default.INTEGER,
    references: {
      model: 'round',
      key: 'id_round'
    }
  },
  id_round_home: {
    type: _Sequelize2.default.INTEGER,
    references: {
      model: 'round',
      key: 'id_round'
    }
  },
  game_time: {
    type: _Sequelize2.default.DATE
  },
  is_finished: _Sequelize2.default.BOOLEAN,
  external_id: _Sequelize2.default.STRING
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

exports.default = GameNba;