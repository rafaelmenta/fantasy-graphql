"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _setup = require("../../model/setup");

var _teamSl = _interopRequireDefault(require("./team-sl"));

var _season = _interopRequireDefault(require("./season"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLFloat = graphql.GraphQLFloat,
    GraphQLBoolean = graphql.GraphQLBoolean,
    GraphQLList = graphql.GraphQLList;
var TeamStatsType = new GraphQLObjectType({
  name: 'TeamStats',
  fields: function fields() {
    return {
      id_sl: {
        type: GraphQLInt
      },
      id_season: {
        type: GraphQLInt
      },
      minutes_pg: {
        type: GraphQLFloat
      },
      minutes_sg: {
        type: GraphQLFloat
      },
      minutes_sf: {
        type: GraphQLFloat
      },
      minutes_pf: {
        type: GraphQLFloat
      },
      minutes_c: {
        type: GraphQLFloat
      },
      fantasy_points: {
        type: GraphQLFloat
      },
      team_sl: {
        type: _teamSl["default"],
        resolve: resolver(_setup.TeamStats.TeamSl)
      },
      season: {
        type: _season["default"],
        resolve: resolver(_setup.TeamStats.Season)
      }
    };
  }
});
var _default = TeamStatsType;
exports["default"] = _default;