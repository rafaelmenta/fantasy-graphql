'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sequelize = require('Sequelize');

var _Sequelize2 = _interopRequireDefault(_Sequelize);

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Player = _connection2.default.define('player', {
  id_player: {
    type: _Sequelize2.default.INTEGER,
    primaryKey: true
  },
  first_name: _Sequelize2.default.STRING,
  last_name: _Sequelize2.default.STRING,
  id_nba: {
    type: _Sequelize2.default.INTEGER,
    references: {
      model: 'team_nba',
      key: 'id_nba'
    }
  },
  default_primary: {
    type: _Sequelize2.default.STRING,
    field: 'primary_position'
  },
  default_secondary: {
    type: _Sequelize2.default.STRING,
    field: 'secondary_position'
  },
  player_slug: _Sequelize2.default.STRING,
  retired: _Sequelize2.default.BOOLEAN,
  rookie: _Sequelize2.default.BOOLEAN,
  birthdate: _Sequelize2.default.DATEONLY,
  contract_salary: _Sequelize2.default.DECIMAL,
  contract_years: _Sequelize2.default.INTEGER
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

exports.default = Player;