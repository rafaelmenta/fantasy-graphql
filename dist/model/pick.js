"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _connection = _interopRequireDefault(require("../database/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Pick = _connection["default"].define('pick', {
  id_pick: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_sl_original: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'team_sl',
      key: 'id_sl'
    }
  },
  id_owner: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'team_sl',
      key: 'id_sl'
    }
  },
  id_draft: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'draft',
      key: 'id_draft'
    }
  },
  round: _sequelize["default"].INTEGER,
  order: _sequelize["default"].INTEGER,
  deadline: _sequelize["default"].DATE,
  is_used: _sequelize["default"].BOOLEAN,
  id_player: _sequelize["default"].INTEGER
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

var _default = Pick;
exports["default"] = _default;