'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Trade = _connection2.default.define('trade', {
  id_trade: {
    autoIncrement: true,
    type: _sequelize2.default.INTEGER,
    primaryKey: true
  },
  id_sender: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'team_sl',
      key: 'id_sl'
    }
  },
  id_receiver: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'team_sl',
      key: 'id_sl'
    }
  },
  status_trade: _sequelize2.default.INTEGER,
  trade_comment: _sequelize2.default.TEXT,
  last_change: _sequelize2.default.DATE,
  views: _sequelize2.default.INTEGER

}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

exports.default = Trade;