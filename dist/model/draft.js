'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sequelize = require('Sequelize');

var _Sequelize2 = _interopRequireDefault(_Sequelize);

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Draft = _connection2.default.define('draft', {
  id_draft: {
    type: _Sequelize2.default.INTEGER,
    primaryKey: true
  },
  id_season: {
    type: _Sequelize2.default.INTEGER,
    references: {
      model: 'season',
      key: 'id_season'
    }
  },
  id_league: {
    type: _Sequelize2.default.INTEGER,
    references: {
      model: 'league',
      key: 'id_league'
    }
  },
  year_draft: _Sequelize2.default.INTEGER,
  status_draft: _Sequelize2.default.INTEGER
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

exports.default = Draft;