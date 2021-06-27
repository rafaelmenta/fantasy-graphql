"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _teamSl = _interopRequireDefault(require("./team-sl"));

var _round = _interopRequireDefault(require("./round"));

var _playerTeamPerformance = _interopRequireDefault(require("./player-team-performance"));

var _teamPerformance = _interopRequireDefault(require("./team-performance"));

var _setup = require("../../model/setup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList;
var GameType = new GraphQLObjectType({
  name: 'Game',
  fields: function fields() {
    return {
      id_game: {
        type: GraphQLInt
      },
      id_type: {
        type: GraphQLInt
      },
      id_round: {
        type: GraphQLInt
      },
      round: {
        type: _round["default"],
        resolve: resolver(_setup.Game.Round)
      },
      home_team: {
        type: _teamSl["default"],
        resolve: resolver(_setup.Game.HomeTeam)
      },
      away_team: {
        type: _teamSl["default"],
        resolve: resolver(_setup.Game.AwayTeam)
      },
      home_players: {
        type: new GraphQLList(_playerTeamPerformance["default"]),
        resolve: _setup.Game.HomePlayers
      },
      away_players: {
        type: new GraphQLList(_playerTeamPerformance["default"]),
        resolve: _setup.Game.AwayPlayers
      },
      home_performance: {
        type: _teamPerformance["default"],
        resolve: _setup.Game.HomePerformance
      },
      away_performance: {
        type: _teamPerformance["default"],
        resolve: _setup.Game.AwayPerformance,
        args: {
          id_sl: {
            name: 'id_sl',
            type: GraphQLInt
          }
        }
      }
    };
  }
});
var _default = GameType;
exports["default"] = _default;