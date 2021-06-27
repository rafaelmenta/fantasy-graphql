"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _connection = _interopRequireDefault(require("../database/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Trade = _connection["default"].define('trade', {
  id_trade: {
    autoIncrement: true,
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  id_sender: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'team_sl',
      key: 'id_sl'
    }
  },
  id_receiver: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'team_sl',
      key: 'id_sl'
    }
  },
  status_trade: _sequelize["default"].INTEGER,
  trade_comment: _sequelize["default"].TEXT,
  last_change: _sequelize["default"].DATE,
  views: _sequelize["default"].INTEGER
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

var _default = Trade;
exports["default"] = _default;