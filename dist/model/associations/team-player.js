"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _connection = _interopRequireDefault(require("../../database/connection"));

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TeamPlayer = _connection["default"].define('team_player', {
  tp_code: {
    autoIncrement: true,
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  id_sl: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'team_sl',
      key: 'id_sl'
    }
  },
  id_player: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'player',
      key: 'id_player'
    }
  },
  primary_position: _sequelize["default"].STRING,
  secondary_position: _sequelize["default"].STRING,
  order: _sequelize["default"].INTEGER
}, {
  freezeTableName: true,
  updatedAt: false,
  createdAt: false
});

var _default = TeamPlayer;
exports["default"] = _default;