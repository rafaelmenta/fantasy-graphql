"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _connection = _interopRequireDefault(require("../database/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Division = _connection["default"].define('division', {
  id_division: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  name: _sequelize["default"].STRING,
  symbol: _sequelize["default"].STRING,
  id_conference: {
    type: _sequelize["default"].INTEGER,
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

var _default = Division;
exports["default"] = _default;