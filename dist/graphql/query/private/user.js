"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("../../object-types/private/user"));

var _setup = require("../../../model/setup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLString = graphql.GraphQLString,
    GraphQLNonNull = graphql.GraphQLNonNull;
var UserQuery = {
  private_user: {
    type: _user["default"],
    resolve: resolver(_setup.User),
    args: {
      id_user: {
        name: 'id_user',
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
  private_users: {
    type: new GraphQLList(_user["default"]),
    resolve: resolver(_setup.User)
  }
};
var _default = UserQuery;
exports["default"] = _default;