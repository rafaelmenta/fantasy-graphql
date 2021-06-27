"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerLeagueSalary = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _connection = _interopRequireDefault(require("../database/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PlayerLeagueSalary = _connection["default"].define('player_league_salary', {
  pls_code: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_league: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'league',
      key: 'id_league'
    }
  },
  id_player: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'player',
      key: 'id_player'
    }
  },
  contract_salary: _sequelize["default"].DECIMAL,
  contract_years: _sequelize["default"].INTEGER
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

exports.PlayerLeagueSalary = PlayerLeagueSalary;