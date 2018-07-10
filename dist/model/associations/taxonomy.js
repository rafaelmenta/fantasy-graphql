'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Taxonomy = undefined;

var _connection = require('../../database/connection');

var _connection2 = _interopRequireDefault(_connection);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Taxonomy = exports.Taxonomy = _connection2.default.define('taxonomy', {
  tax_id: {
    type: _sequelize2.default.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  slug: {
    type: _sequelize2.default.STRING,
    unique: true
  },
  id: _sequelize2.default.INTEGER
}, {
  freezeTableName: true,
  updatedAt: false,
  createdAt: false
});