"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _setup = require("../../model/setup");

var _player = _interopRequireDefault(require("./player"));

var _teamSl = _interopRequireDefault(require("./team-sl"));

var _round = _interopRequireDefault(require("./round"));

var _playerPerformance = _interopRequireDefault(require("./player-performance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLFloat = graphql.GraphQLFloat,
    GraphQLBoolean = graphql.GraphQLBoolean,
    GraphQLList = graphql.GraphQLList;
var PlayerTeamPerformanceType = new GraphQLObjectType({
  name: 'PlayerTeamPerformance',
  fields: function fields() {
    return {
      ptp_code: {
        type: GraphQLInt
      },
      id_sl: {
        type: GraphQLInt
      },
      id_round: {
        type: GraphQLInt
      },
      id_player: {
        type: GraphQLInt
      },
      fantasy_points: {
        type: GraphQLFloat
      },
      order: {
        type: GraphQLInt
      },
      primary_position: {
        type: GraphQLString
      },
      secondary_position: {
        type: GraphQLString
      },
      minutes_primary: {
        type: GraphQLInt
      },
      minutes_secondary: {
        type: GraphQLInt
      },
      player: {
        type: _player["default"],
        resolve: resolver(_setup.PlayerTeamPerformance.Player)
      },
      round: {
        type: _round["default"],
        resolve: resolver(_setup.PlayerTeamPerformance.Round)
      },
      team_sl: {
        type: _teamSl["default"],
        resolve: resolver(_setup.PlayerTeamPerformance.TeamSl)
      },
      performance: {
        type: _playerPerformance["default"],
        resolve: _setup.PlayerTeamPerformance.PlayerPerformance
      }
    };
  }
});
var _default = PlayerTeamPerformanceType;
exports["default"] = _default;