'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var League = _connection2.default.define('league', {
  id_league: {
    type: _sequelize2.default.INTEGER,
    primaryKey: true
  },
  name: _sequelize2.default.STRING,
  symbol: _sequelize2.default.STRING,
  id_owner: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'user',
      key: 'id_user'
    }
  },
  id_type: _sequelize2.default.INTEGER,
  number_of_teams: _sequelize2.default.INTEGER
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

exports.default = League;