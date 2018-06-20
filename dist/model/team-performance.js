'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TeamPerformance = _connection2.default.define('team_performance', {

  tpf_code: {
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
  id_round: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'round',
      key: 'id_round'
    }
  },
  minutes_pg: _sequelize2.default.INTEGER,
  minutes_sg: _sequelize2.default.INTEGER,
  minutes_sf: _sequelize2.default.INTEGER,
  minutes_pf: _sequelize2.default.INTEGER,
  minutes_c: _sequelize2.default.INTEGER,
  fantasy_points: _sequelize2.default.DECIMAL
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

exports.default = TeamPerformance;