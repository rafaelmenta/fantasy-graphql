'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Round = _connection2.default.define('round', {
  id_round: {
    type: _sequelize2.default.INTEGER,
    primaryKey: true
  },
  description: _sequelize2.default.STRING,
  round_number: _sequelize2.default.INTEGER,
  id_season: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'season',
      key: 'id_season'
    }
  },
  open_date: _sequelize2.default.DATE,
  close_date: _sequelize2.default.DATE,
  processed: _sequelize2.default.BOOLEAN,
  opened: _sequelize2.default.BOOLEAN
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

exports.default = Round;