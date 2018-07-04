'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ArchiveTeamStats = _connection2.default.define('archive_team_stats', {
  ats_id: {
    type: _sequelize2.default.INTEGER,
    primaryKey: true
  },
  id_sl: _sequelize2.default.INTEGER,
  id_season: _sequelize2.default.INTEGER,
  id_league: _sequelize2.default.INTEGER,
  name: _sequelize2.default.STRING,
  slug: _sequelize2.default.STRING,
  season: _sequelize2.default.STRING,
  win: _sequelize2.default.INTEGER,
  loss: _sequelize2.default.INTEGER,
  fantasy_points: _sequelize2.default.DECIMAL
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

exports.default = ArchiveTeamStats;