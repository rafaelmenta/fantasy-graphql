"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _connection = _interopRequireDefault(require("../database/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Player = _connection["default"].define('player', {
  id_player: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: _sequelize["default"].STRING,
  last_name: _sequelize["default"].STRING,
  id_nba: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'team_nba',
      key: 'id_nba'
    }
  },
  default_primary: {
    type: _sequelize["default"].STRING,
    field: 'primary_position'
  },
  default_secondary: {
    type: _sequelize["default"].STRING,
    field: 'secondary_position'
  },
  player_slug: _sequelize["default"].STRING,
  retired: _sequelize["default"].BOOLEAN,
  rookie: _sequelize["default"].BOOLEAN,
  birthdate: _sequelize["default"].DATEONLY,
  contract_salary: _sequelize["default"].DECIMAL,
  contract_years: _sequelize["default"].INTEGER
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

var _default = Player;
exports["default"] = _default;