"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArchiveTeamPlayoffsStats = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _connection = _interopRequireDefault(require("../database/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ArchiveTeamPlayoffsStats = _connection["default"].define('archive_team_playoffs_stats', {
  atps_id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  id_sl: _sequelize["default"].INTEGER,
  id_season: _sequelize["default"].INTEGER,
  id_league: _sequelize["default"].INTEGER,
  name: _sequelize["default"].STRING,
  slug: _sequelize["default"].STRING,
  season: _sequelize["default"].STRING,
  win: _sequelize["default"].INTEGER,
  loss: _sequelize["default"].INTEGER,
  fantasy_points: _sequelize["default"].DECIMAL
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

exports.ArchiveTeamPlayoffsStats = ArchiveTeamPlayoffsStats;