'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Game = _connection2.default.define('game', {
  id_game: {
    type: _sequelize2.default.INTEGER,
    primaryKey: true
  },
  id_type: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'game_type',
      key: 'id_type'
    }
  },
  id_round: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'round',
      key: 'id_round'
    }
  },
  home_team: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'team_sl',
      key: 'id_sl'
    }
  },
  away_team: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'team_sl',
      key: 'id_sl'
    }
  }
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

exports.default = Game;