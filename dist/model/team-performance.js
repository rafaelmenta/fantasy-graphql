"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _connection = _interopRequireDefault(require("../database/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TeamPerformance = _connection["default"].define('team_performance', {
  tpf_code: {
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
  id_round: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'round',
      key: 'id_round'
    }
  },
  minutes_pg: _sequelize["default"].INTEGER,
  minutes_sg: _sequelize["default"].INTEGER,
  minutes_sf: _sequelize["default"].INTEGER,
  minutes_pf: _sequelize["default"].INTEGER,
  minutes_c: _sequelize["default"].INTEGER,
  fantasy_points: _sequelize["default"].FLOAT
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

var _default = TeamPerformance;
exports["default"] = _default;