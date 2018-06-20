'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connection = require('../../database/connection');

var _connection2 = _interopRequireDefault(_connection);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LeagueConfig = _connection2.default.define('league_config', {
  id_config: {
    type: _sequelize2.default.STRING,
    primaryKey: true
  },
  id_league: {
    type: _sequelize2.default.INTEGER,
    primaryKey: true,
    references: {
      model: 'league',
      key: 'id_league'
    }
  },
  config_value: _sequelize2.default.STRING
}, {
  freezeTableName: true,
  updatedAt: false,
  createdAt: false
});

exports.default = LeagueConfig;