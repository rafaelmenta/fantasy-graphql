"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _connection = _interopRequireDefault(require("../database/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GameNba = _connection["default"].define('game_nba', {
  id_game_nba: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_away: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'team_nba',
      key: 'id_nba'
    }
  },
  id_home: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'team_nba',
      key: 'id_nba'
    }
  },
  id_round_away: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'round',
      key: 'id_round'
    }
  },
  id_round_home: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'round',
      key: 'id_round'
    }
  },
  game_time: {
    type: _sequelize["default"].DATE
  },
  is_finished: _sequelize["default"].BOOLEAN,
  external_id: _sequelize["default"].STRING
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

var _default = GameNba;
exports["default"] = _default;