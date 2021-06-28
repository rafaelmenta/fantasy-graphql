"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerBidHistory = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _connection = _interopRequireDefault(require("../database/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PlayerBidHistory = _connection["default"].define('player_bid_history', {
  id_bid_history: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_bid: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'player_bid',
      key: 'id_bid'
    }
  },
  id_player: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'player',
      key: 'id_player'
    }
  },
  id_sl: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'team_sl',
      key: 'id_sl'
    }
  },
  salary: _sequelize["default"].DECIMAL,
  years: _sequelize["default"].INTEGER,
  bid_time: _sequelize["default"].DATE
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

exports.PlayerBidHistory = PlayerBidHistory;