'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connection = require('../../database/connection');

var _connection2 = _interopRequireDefault(_connection);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TeamSeason = _connection2.default.define('team_season', {
  ts_code: {
    type: _sequelize2.default.INTEGER,
    primaryKey: true
  },
  id_sl: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'team_sl',
      key: 'id_sl'
    }
  },
  id_season: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'season',
      key: 'id_season'
    }
  },
  win: _sequelize2.default.INTEGER,
  loss: _sequelize2.default.INTEGER
}, {
  freezeTableName: true,
  updatedAt: false,
  createdAt: false
});

exports.default = TeamSeason;