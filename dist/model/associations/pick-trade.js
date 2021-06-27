"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _connection = _interopRequireDefault(require("../../database/connection"));

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PlayerTrade = _connection["default"].define('pick_trade', {
  pct_code: {
    autoIncrement: true,
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  id_trade: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'trade',
      key: 'id_trade'
    }
  },
  id_pick: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'pick',
      key: 'id_pick'
    }
  },
  is_sender: _sequelize["default"].BOOLEAN
}, {
  freezeTableName: true,
  updatedAt: false,
  createdAt: false
});

var _default = PlayerTrade;
exports["default"] = _default;