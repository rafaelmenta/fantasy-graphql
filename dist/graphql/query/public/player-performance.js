"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _playerPerformance = _interopRequireDefault(require("../../object-types/player-performance"));

var _setup = require("../../../model/setup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLNonNull = graphql.GraphQLNonNull;
var PlayerPerformanceQuery = {
  performance: {
    type: _playerPerformance["default"],
    resolve: resolver(_setup.PlayerPerformance),
    args: {
      id_player_performance: {
        name: 'id_player_performance',
        type: new GraphQLNonNull(GraphQLInt)
      }
    }
  },
  round_averages: {
    type: new GraphQLList(_playerPerformance["default"]),
    resolve: _setup.PlayerPerformance.RoundAverages,
    args: {
      id_season: {
        name: 'id_season',
        type: new GraphQLNonNull(GraphQLInt)
      }
    }
  },
  performances: {
    type: new GraphQLList(_playerPerformance["default"]),
    resolve: resolver(_setup.PlayerPerformance),
    args: {
      id_round: {
        name: 'id_round',
        type: new GraphQLList(GraphQLInt)
      },
      id_player: {
        name: 'id_player',
        type: new GraphQLList(GraphQLInt)
      }
    }
  }
};
var _default = PlayerPerformanceQuery;
exports["default"] = _default;