'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Player = _connection2.default.define('player', {
  id_player: {
    type: _sequelize2.default.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: _sequelize2.default.STRING,
  last_name: _sequelize2.default.STRING,
  id_nba: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'team_nba',
      key: 'id_nba'
    }
  },
  default_primary: {
    type: _sequelize2.default.STRING,
    field: 'primary_position'
  },
  default_secondary: {
    type: _sequelize2.default.STRING,
    field: 'secondary_position'
  },
  player_slug: _sequelize2.default.STRING,
  retired: _sequelize2.default.BOOLEAN,
  rookie: _sequelize2.default.BOOLEAN,
  birthdate: _sequelize2.default.DATEONLY,
  contract_salary: _sequelize2.default.DECIMAL,
  contract_years: _sequelize2.default.INTEGER
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

exports.default = Player;