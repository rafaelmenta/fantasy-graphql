"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _connection = _interopRequireDefault(require("../database/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Round = _connection["default"].define('round', {
  id_round: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  description: _sequelize["default"].STRING,
  round_number: _sequelize["default"].INTEGER,
  id_season: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'season',
      key: 'id_season'
    }
  },
  open_date: _sequelize["default"].DATE,
  close_date: _sequelize["default"].DATE,
  processed: _sequelize["default"].BOOLEAN,
  opened: _sequelize["default"].BOOLEAN
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

var _default = Round;
exports["default"] = _default;