"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Taxonomy = void 0;

var _connection = _interopRequireDefault(require("../../database/connection"));

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Taxonomy = _connection["default"].define('taxonomy', {
  tax_id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  slug: {
    type: _sequelize["default"].STRING,
    unique: true
  },
  id: _sequelize["default"].INTEGER
}, {
  freezeTableName: true,
  updatedAt: false,
  createdAt: false
});

exports.Taxonomy = Taxonomy;