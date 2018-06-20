'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sequelize = require('Sequelize');

var _Sequelize2 = _interopRequireDefault(_Sequelize);

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Trade = _connection2.default.define('trade', {
  id_trade: {
    autoIncrement: true,
    type: _Sequelize2.default.INTEGER,
    primaryKey: true
  },
  id_sender: {
    type: _Sequelize2.default.INTEGER,
    references: {
      model: 'team_sl',
      key: 'id_sl'
    }
  },
  id_receiver: {
    type: _Sequelize2.default.INTEGER,
    references: {
      model: 'team_sl',
      key: 'id_sl'
    }
  },
  status_trade: _Sequelize2.default.INTEGER,
  trade_comment: _Sequelize2.default.TEXT,
  last_change: _Sequelize2.default.DATE,
  views: _Sequelize2.default.INTEGER

}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

exports.default = Trade;