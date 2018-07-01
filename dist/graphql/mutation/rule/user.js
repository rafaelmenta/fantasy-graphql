'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('../../object-types/private/user');

var _user2 = _interopRequireDefault(_user);

var _user3 = require('../../object-types/input/user');

var _user4 = _interopRequireDefault(_user3);

var _setup = require('../../../model/setup');

var _connection = require('../../../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql');

var GraphQLList = graphql.GraphQLList,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLNonNull = graphql.GraphQLNonNull;


var UserMutation = {
  addUser: {
    type: _user2.default,
    args: {
      user: { type: _user4.default }
    },
    resolve: function resolve(root, _ref) {
      var user = _ref.user;
      return _setup.User.create(user);
    }
  },
  updateUser: {
    type: new GraphQLList(GraphQLInt),
    description: 'Returns [update_count]',
    args: {
      user: { type: _user4.default }
    },
    resolve: function resolve(root, _ref2) {
      var user = _ref2.user;
      return _setup.User.update(user, {
        where: {
          id_user: user.id_user
        }
      });
    }
  },
  deleteUser: {
    type: GraphQLInt,
    description: 'Returns deleted items',
    args: {
      id_user: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: function resolve(root, user) {
      return _setup.User.destroy({
        where: {
          id_user: user.id_user
        }
      });
    }
  },
  updateDefaultTeam: {
    type: new GraphQLList(GraphQLInt),
    description: 'Return [update_count]',
    args: {
      id_user: { type: new GraphQLNonNull(GraphQLInt) },
      id_sl: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: function resolve(root, args) {
      return _connection2.default.transaction(function (t) {
        return _setup.UserTeam.update({ default_team: false }, { where: { id_user: args.id_user }, transaction: t }).then(function () {
          return _setup.UserTeam.update({ default_team: true }, { where: { id_user: args.id_user, id_sl: args.id_sl }, transaction: t });
        });
      });
    }
  }
};

exports.default = UserMutation;