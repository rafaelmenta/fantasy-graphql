'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sequelize = require('Sequelize');

var _Sequelize2 = _interopRequireDefault(_Sequelize);

var _connection = require('../../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TeamStats = _connection2.default.define('team_stats', {

  id_sl: {
    type: _Sequelize2.default.INTEGER,
    primaryKey: true,
    references: {
      model: 'team_sl',
      key: 'id_sl'
    }
  },
  id_season: {
    type: _Sequelize2.default.INTEGER,
    primaryKey: true,
    references: {
      model: 'season',
      key: 'id_season'
    }
  },
  minutes_pg: _Sequelize2.default.INTEGER,
  minutes_sg: _Sequelize2.default.INTEGER,
  minutes_sf: _Sequelize2.default.INTEGER,
  minutes_pf: _Sequelize2.default.INTEGER,
  minutes_c: _Sequelize2.default.INTEGER,
  fantasy_points: _Sequelize2.default.DECIMAL
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

exports.default = TeamStats;