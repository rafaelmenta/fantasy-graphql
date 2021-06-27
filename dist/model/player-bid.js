"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerBid = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _connection = _interopRequireDefault(require("../database/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PlayerBid = _connection["default"].define('player_bid', {
  id_bid: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_auction: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'auction',
      key: 'id_auction'
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
  expiration: _sequelize["default"].DATE
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

exports.PlayerBid = PlayerBid;