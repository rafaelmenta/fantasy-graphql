'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sequelize = require('Sequelize');

var _Sequelize2 = _interopRequireDefault(_Sequelize);

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Season = _connection2.default.define('season', {
  id_season: {
    type: _Sequelize2.default.INTEGER,
    primaryKey: true
  },
  year: _Sequelize2.default.STRING,
  current: _Sequelize2.default.BOOLEAN
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

exports.default = Season;