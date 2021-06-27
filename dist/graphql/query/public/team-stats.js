"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _teamStats = _interopRequireDefault(require("../../object-types/team-stats"));

var _setup = require("../../../model/setup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLNonNull = graphql.GraphQLNonNull;
var TeamStatsQuery = {
  team_averages: {
    type: new GraphQLList(_teamStats["default"]),
    resolve: resolver(_setup.TeamStats),
    args: {
      id_sl: {
        name: 'id_sl',
        type: new GraphQLNonNull(GraphQLInt)
      }
    }
  },
  team_season_averages: {
    type: new GraphQLList(_teamStats["default"]),
    resolve: resolver(_setup.TeamStats),
    args: {
      id_season: {
        name: 'id_season',
        type: new GraphQLNonNull(GraphQLInt)
      }
    }
  },
  general_averages: {
    type: new GraphQLList(_teamStats["default"]),
    resolve: resolver(_setup.TeamStats),
    args: {
      id_season: {
        name: 'id_season',
        type: new GraphQLList(GraphQLInt)
      },
      id_sl: {
        name: 'id_sl',
        type: new GraphQLList(GraphQLInt)
      }
    }
  }
};
var _default = TeamStatsQuery;
exports["default"] = _default;