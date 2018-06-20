'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sequelize = require('Sequelize');

var _Sequelize2 = _interopRequireDefault(_Sequelize);

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Round = _connection2.default.define('round', {
  id_round: {
    type: _Sequelize2.default.INTEGER,
    primaryKey: true
  },
  description: _Sequelize2.default.STRING,
  round_number: _Sequelize2.default.INTEGER,
  id_season: {
    type: _Sequelize2.default.INTEGER,
    references: {
      model: 'season',
      key: 'id_season'
    }
  },
  open_date: _Sequelize2.default.DATE,
  close_date: _Sequelize2.default.DATE,
  processed: _Sequelize2.default.BOOLEAN
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

exports.default = Round;