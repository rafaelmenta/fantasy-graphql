"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _setup = require("../../model/setup");

var _teamSl = _interopRequireDefault(require("./team-sl"));

var _round = _interopRequireDefault(require("./round"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLFloat = graphql.GraphQLFloat,
    GraphQLBoolean = graphql.GraphQLBoolean,
    GraphQLList = graphql.GraphQLList;
var TeamPerformanceType = new GraphQLObjectType({
  name: 'TeamPerformance',
  fields: function fields() {
    return {
      tpf_code: {
        type: GraphQLInt
      },
      minutes_pg: {
        type: GraphQLInt
      },
      minutes_sg: {
        type: GraphQLInt
      },
      minutes_sf: {
        type: GraphQLInt
      },
      minutes_pf: {
        type: GraphQLInt
      },
      minutes_c: {
        type: GraphQLInt
      },
      fantasy_points: {
        type: GraphQLFloat
      },
      team_sl: {
        type: _teamSl["default"],
        resolve: resolver(_setup.TeamPerformance.Team)
      },
      round: {
        type: _round["default"],
        resolve: resolver(_setup.TeamPerformance.Round)
      }
    };
  }
});
var _default = TeamPerformanceType;
exports["default"] = _default;