"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _connection = _interopRequireDefault(require("../database/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Season = _connection["default"].define('season', {
  id_season: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  year: _sequelize["default"].STRING,
  current: _sequelize["default"].BOOLEAN
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

var _default = Season;
exports["default"] = _default;