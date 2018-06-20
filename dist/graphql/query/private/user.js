'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('../../object-types/private/user');

var _user2 = _interopRequireDefault(_user);

var _setup = require('../../../model/setup');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLString = graphql.GraphQLString,
    GraphQLNonNull = graphql.GraphQLNonNull;


var UserQuery = {
  private_user: {
    type: _user2.default,
    resolve: resolver(_setup.User),
    args: {
      id_user: {
        name: 'id_user',
        type: GraphQLInt
      },
      login: {
        name: 'login',
        type: GraphQLString
      }
    }
  },
  private_users: {
    type: new GraphQLList(_user2.default),
    resolve: resolver(_setup.User)
  }
};

exports.default = UserQuery;