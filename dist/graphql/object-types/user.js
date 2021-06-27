"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _userTeam = _interopRequireDefault(require("./user-team"));

var _user = _interopRequireDefault(require("../../model/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList;
var UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A User',
  fields: function fields() {
    return {
      id_user: {
        type: GraphQLInt
      },
      id_permission: {
        type: GraphQLInt
      },
      login: {
        type: GraphQLString
      },
      nickname: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      first_name: {
        type: GraphQLString
      },
      last_name: {
        type: GraphQLString
      },
      teams: {
        type: new GraphQLList(_userTeam["default"]),
        resolve: resolver(_user["default"].UserTeams)
      }
    };
  }
});
var _default = UserType;
exports["default"] = _default;