'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('../../object-types/user');

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
  user: {
    type: _user2.default,
    resolve: resolver(_setup.User),
    args: {
      id_user: {
        name: 'id_user',
        type: GraphQLInt
      },
      id_permission: {
        name: 'id_permission',
        type: GraphQLInt
      },
      login: {
        name: 'login',
        type: GraphQLString
      },
      first_name: {
        name: 'first_name',
        type: GraphQLString
      },
      last_name: {
        name: 'last_name',
        type: GraphQLString
      },
      email: {
        name: 'email',
        type: GraphQLString
      }
    }
  },
  users: {
    type: new GraphQLList(_user2.default),
    resolve: resolver(_setup.User)
  }
};

exports.default = UserQuery;