"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _connection = _interopRequireDefault(require("../../database/connection"));

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TeamSeason = _connection["default"].define('team_season', {
  ts_code: {
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
  id_season: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'season',
      key: 'id_season'
    }
  },
  win: _sequelize["default"].INTEGER,
  loss: _sequelize["default"].INTEGER
}, {
  freezeTableName: true,
  updatedAt: false,
  createdAt: false
});

var _default = TeamSeason;
exports["default"] = _default;