'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerLeagueSalary = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PlayerLeagueSalary = exports.PlayerLeagueSalary = _connection2.default.define('player_league_salary', {
  pls_code: {
    type: _sequelize2.default.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_league: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'league',
      key: 'id_league'
    }
  },
  id_player: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'player',
      key: 'id_player'
    }
  },
  contract_salary: _sequelize2.default.DECIMAL,
  contract_years: _sequelize2.default.INTEGER
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});