"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _connection = _interopRequireDefault(require("../database/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Draft = _connection["default"].define('draft', {
  id_draft: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_season: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'season',
      key: 'id_season'
    }
  },
  id_league: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'league',
      key: 'id_league'
    }
  },
  year_draft: _sequelize["default"].INTEGER,
  status_draft: _sequelize["default"].INTEGER,
  draft_type: _sequelize["default"].INTEGER
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

var _default = Draft;
exports["default"] = _default;