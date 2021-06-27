"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _playerStats = _interopRequireDefault(require("../../object-types/player-stats"));

var _setup = require("../../../model/setup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLNonNull = graphql.GraphQLNonNull;
var PlayerStatsQuery = {
  player_averages: {
    type: new GraphQLList(_playerStats["default"]),
    resolve: resolver(_setup.PlayerStats),
    args: {
      id_player: {
        name: 'id_player',
        type: new GraphQLNonNull(GraphQLInt)
      }
    }
  },
  season_averages: {
    type: new GraphQLList(_playerStats["default"]),
    resolve: resolver(_setup.PlayerStats),
    args: {
      id_season: {
        name: 'id_season',
        type: new GraphQLNonNull(GraphQLInt)
      },
      limit: {
        name: 'limit',
        type: GraphQLInt
      }
    }
  },
  averages: {
    type: new GraphQLList(_playerStats["default"]),
    resolve: resolver(_setup.PlayerStats),
    args: {
      id_season: {
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
var _default = PlayerStatsQuery;
exports["default"] = _default;