"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _connection = _interopRequireDefault(require("../../database/connection"));

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var UserTeam = _connection["default"].define('user_team', {
  ut_code: {
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
  id_user: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'user',
      key: 'id_user'
    }
  },
  default_team: _sequelize["default"].BOOLEAN
}, {
  freezeTableName: true,
  updatedAt: false,
  createdAt: false
});

var _default = UserTeam;
exports["default"] = _default;