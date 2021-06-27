"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _teamSl = _interopRequireDefault(require("./team-sl"));

var _setup = require("../../model/setup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLBoolean = graphql.GraphQLBoolean,
    GraphQLList = graphql.GraphQLList;
var UserTeamType = new GraphQLObjectType({
  name: 'UserTeam',
  fields: function fields() {
    return {
      ut_code: {
        type: GraphQLInt
      },
      id_sl: {
        type: GraphQLInt
      },
      id_user: {
        type: GraphQLInt
      },
      default_team: {
        type: GraphQLBoolean
      },
      team: {
        type: _teamSl["default"],
        resolve: resolver(_setup.UserTeam.Team)
      }
    };
  }
});
var _default = UserTeamType;
exports["default"] = _default;