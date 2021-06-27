"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _teamPerformance = _interopRequireDefault(require("../../object-types/team-performance"));

var _setup = require("../../../model/setup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLNonNull = graphql.GraphQLNonNull;
var TeamPerformanceQuery = {
  team_performance: {
    type: _teamPerformance["default"],
    resolve: resolver(_setup.TeamPerformance),
    args: {
      id_player_performance: {
        name: 'tpf_code',
        type: new GraphQLNonNull(GraphQLInt)
      }
    }
  },
  team_performances: {
    type: new GraphQLList(_teamPerformance["default"]),
    resolve: resolver(_setup.TeamPerformance),
    args: {
      id_round: {
        name: 'id_round',
        type: new GraphQLList(GraphQLInt)
      },
      id_sl: {
        name: 'id_sl',
        type: new GraphQLList(GraphQLInt)
      }
    }
  }
};
var _default = TeamPerformanceQuery;
exports["default"] = _default;