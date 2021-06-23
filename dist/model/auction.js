'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Auction = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Auction = exports.Auction = _connection2.default.define('auction', {
  id_auction: {
    type: _sequelize2.default.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_league: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'league',
      key: 'id_league'
    }
  },
  date_started: _sequelize2.default.DATE,
  date_ended: _sequelize2.default.DATE,
  status: _sequelize2.default.INTEGER
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});