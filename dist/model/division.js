'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sequelize = require('Sequelize');

var _Sequelize2 = _interopRequireDefault(_Sequelize);

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Division = _connection2.default.define('division', {
  id_division: {
    type: _Sequelize2.default.INTEGER,
    primaryKey: true
  },
  name: _Sequelize2.default.STRING,
  symbol: _Sequelize2.default.STRING,
  id_conference: {
    type: _Sequelize2.default.INTEGER,
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