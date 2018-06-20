'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Division = _connection2.default.define('division', {
  id_division: {
    type: _sequelize2.default.INTEGER,
    primaryKey: true
  },
  name: _sequelize2.default.STRING,
  symbol: _sequelize2.default.STRING,
  id_conference: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'conference',
      key: 'id_conference'
    }
  }
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

exports.default = Division;