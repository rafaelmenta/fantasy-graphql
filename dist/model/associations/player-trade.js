'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connection = require('../../database/connection');

var _connection2 = _interopRequireDefault(_connection);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PlayerTrade = _connection2.default.define('player_trade', {
  ptr_code: {
    autoIncrement: true,
    type: _sequelize2.default.INTEGER,
    primaryKey: true
  },
  id_trade: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'trade',
      key: 'id_trade'
    }
  },
  id_player: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'player',
      key: 'id_player'
    }
  },
  is_sender: _sequelize2.default.BOOLEAN
}, {
  freezeTableName: true,
  updatedAt: false,
  createdAt: false
});

exports.default = PlayerTrade;