"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Auction = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _connection = _interopRequireDefault(require("../database/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Auction = _connection["default"].define('auction', {
  id_auction: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_league: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'league',
      key: 'id_league'
    }
  },
  date_started: _sequelize["default"].DATE,
  date_ended: _sequelize["default"].DATE,
  status: _sequelize["default"].INTEGER
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

exports.Auction = Auction;