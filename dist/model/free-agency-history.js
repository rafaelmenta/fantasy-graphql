'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FreeAgencyHistory = _connection2.default.define('free_agency_history', {
  fah_code: {
    type: _sequelize2.default.INTEGER,
    primaryKey: true
  },
  id_player: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'player',
      key: 'id_player'
    }
  },
  id_sl: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'team_sl',
      key: 'id_sl'
    }
  },
  event_date: _sequelize2.default.DATE,
  action: _sequelize2.default.STRING
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

exports.default = FreeAgencyHistory;