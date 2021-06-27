"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _connection = _interopRequireDefault(require("../database/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Conference = _connection["default"].define('conference', {
  id_conference: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  name: _sequelize["default"].STRING,
  symbol: _sequelize["default"].STRING,
  id_league: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'league',
      key: 'id_league'
    }
  }
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

var _default = Conference;
exports["default"] = _default;