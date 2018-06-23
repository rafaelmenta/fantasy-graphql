'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connection = require('../../database/connection');

var _connection2 = _interopRequireDefault(_connection);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserTeam = _connection2.default.define('user_team', {
  ut_code: {
    type: _sequelize2.default.INTEGER,
    primaryKey: true
  },
  id_sl: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'team_sl',
      key: 'id_sl'
    }
  },
  id_user: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'user',
      key: 'id_user'
    }
  },
  default_team: _sequelize2.default.BOOLEAN
}, {
  freezeTableName: true,
  updatedAt: false,
  createdAt: false
});

exports.default = UserTeam;