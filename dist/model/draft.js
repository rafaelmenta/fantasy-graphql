'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Draft = _connection2.default.define('draft', {
  id_draft: {
    type: _sequelize2.default.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_season: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'season',
      key: 'id_season'
    }
  },
  id_league: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'league',
      key: 'id_league'
    }
  },
  year_draft: _sequelize2.default.INTEGER,
  status_draft: _sequelize2.default.INTEGER,
  draft_type: _sequelize2.default.INTEGER
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

exports.default = Draft;