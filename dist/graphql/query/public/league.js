"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _league = _interopRequireDefault(require("../../object-types/league"));

var _setup = require("../../../model/setup");

var _leagueOverview = require("../../object-types/manual/league-overview");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLNonNull = graphql.GraphQLNonNull;
var LeagueQuery = {
  leagues: {
    type: new GraphQLList(_league["default"]),
    resolve: resolver(_setup.League)
  },
  league: {
    type: _league["default"],
    resolve: resolver(_setup.League),
    args: {
      id_league: {
        type: new GraphQLNonNull(GraphQLInt),
        name: 'id_league'
      }
    }
  },
  league_overview: _leagueOverview.ManualLeagueOverviewQuery
};
var _default = LeagueQuery;
exports["default"] = _default;