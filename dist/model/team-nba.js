'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _userTeam = require('./associations/user-team');

var _userTeam2 = _interopRequireDefault(_userTeam);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TeamNba = _connection2.default.define('team_nba', {
  id_nba: {
    type: _sequelize2.default.INTEGER,
    primaryKey: true
  },
  city: _sequelize2.default.STRING,
  nickname: _sequelize2.default.STRING,
  symbol: _sequelize2.default.STRING,
  primary_color: _sequelize2.default.STRING,
  secondary_color: _sequelize2.default.STRING,
  slug: _sequelize2.default.STRING
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

exports.default = TeamNba;