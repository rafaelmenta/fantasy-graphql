'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sequelize = require('Sequelize');

var _Sequelize2 = _interopRequireDefault(_Sequelize);

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pick = _connection2.default.define('pick', {
  id_pick: {
    type: _Sequelize2.default.INTEGER,
    primaryKey: true
  },
  id_sl_original: {
    type: _Sequelize2.default.INTEGER,
    references: {
      model: 'team_sl',
      key: 'id_sl'
    }
  },
  id_owner: {
    type: _Sequelize2.default.INTEGER,
    references: {
      model: 'team_sl',
      key: 'id_sl'
    }
  },
  id_draft: {
    type: _Sequelize2.default.INTEGER,
    references: {
      model: 'draft',
      key: 'id_draft'
    }
  },
  round: _Sequelize2.default.INTEGER,
  order: _Sequelize2.default.INTEGER,
  deadline: _Sequelize2.default.DATE,
  is_used: _Sequelize2.default.BOOLEAN,
  id_player: _Sequelize2.default.INTEGER
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});

exports.default = Pick;