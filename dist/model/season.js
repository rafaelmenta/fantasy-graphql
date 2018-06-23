'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Season = _connection2.default.define('season', {
  id_season: {
    type: _sequelize2.default.INTEGER,
    primaryKey: true
  },
  year: _sequelize2.default.STRING,
  current: _sequelize2.default.BOOLEAN
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

exports.default = Season;