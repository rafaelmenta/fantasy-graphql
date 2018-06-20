'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connection = require('../../database/connection');

var _connection2 = _interopRequireDefault(_connection);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TeamPlayer = _connection2.default.define('team_player', {
  tp_code: {
    autoIncrement: true,
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
  id_player: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'player',
      key: 'id_player'
    }
  },
  primary_position: _sequelize2.default.STRING,
  secondary_position: _sequelize2.default.STRING,
  order: _sequelize2.default.INTEGER
}, {
  freezeTableName: true,
  updatedAt: false,
  createdAt: false
});

exports.default = TeamPlayer;