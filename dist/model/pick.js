'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pick = _connection2.default.define('pick', {
  id_pick: {
    type: _sequelize2.default.INTEGER,
    primaryKey: true
  },
  id_sl_original: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'team_sl',
      key: 'id_sl'
    }
  },
  id_owner: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'team_sl',
      key: 'id_sl'
    }
  },
  id_draft: {
    type: _sequelize2.default.INTEGER,
    references: {
      model: 'draft',
      key: 'id_draft'
    }
  },
  round: _sequelize2.default.INTEGER,
  order: _sequelize2.default.INTEGER,
  deadline: _sequelize2.default.DATE,
  is_used: _sequelize2.default.BOOLEAN,
  id_player: _sequelize2.default.INTEGER
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

exports.default = Pick;