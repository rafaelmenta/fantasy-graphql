'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerBid = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PlayerBid = exports.PlayerBid = _connection2.default.define('player_bid', {
  id_bid: {
    type: _sequelize2.default.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_auction: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'auction',
      key: 'id_auction'
    }
  },
  id_player: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'player',
      key: 'id_player'
    }
  },
  id_sl: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'team_sl',
      key: 'id_sl'
    }
  },
  salary: _sequelize2.default.DECIMAL,
  years: _sequelize2.default.INTEGER,
  expiration: _sequelize2.default.DATE
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});