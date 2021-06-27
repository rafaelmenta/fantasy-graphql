"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _connection = _interopRequireDefault(require("../database/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Game = _connection["default"].define('game', {
  id_game: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_type: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'game_type',
      key: 'id_type'
    }
  },
  id_round: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'round',
      key: 'id_round'
    }
  },
  home_team: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'team_sl',
      key: 'id_sl'
    }
  },
  away_team: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'team_sl',
      key: 'id_sl'
    }
  }
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

var _default = Game;
exports["default"] = _default;