"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _connection = _interopRequireDefault(require("../database/connection"));

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var FreeAgencyHistory = _connection["default"].define('free_agency_history', {
  fah_code: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
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
  event_date: _sequelize["default"].DATE,
  action: _sequelize["default"].STRING
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

var _default = FreeAgencyHistory;
exports["default"] = _default;