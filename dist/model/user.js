'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

var _userTeam = require('./associations/user-team');

var _userTeam2 = _interopRequireDefault(_userTeam);

var _teamSl = require('./team-sl');

var _teamSl2 = _interopRequireDefault(_teamSl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _connection2.default.define('user', {
  id_user: {
    autoIncrement: true,
    type: _sequelize2.default.INTEGER,
    primaryKey: true
  },
  first_name: _sequelize2.default.STRING,
  last_name: _sequelize2.default.STRING,
  nickname: _sequelize2.default.STRING,
  email: _sequelize2.default.STRING,
  login: _sequelize2.default.STRING,
  password: _sequelize2.default.STRING,
  id_permission: _sequelize2.default.INTEGER
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true // Model tableName will be the same as the model name
});

exports.default = User;