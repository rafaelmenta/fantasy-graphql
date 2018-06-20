'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _playerPerformance = require('../../object-types/player-performance');

var _playerPerformance2 = _interopRequireDefault(_playerPerformance);

var _setup = require('../../../model/setup');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLNonNull = graphql.GraphQLNonNull;


var PlayerPerformanceQuery = {
  performance: {
    type: _playerPerformance2.default,
    resolve: resolver(_setup.PlayerPerformance),
    args: {
      id_player_performance: {
        name: 'id_player_performance',
        type: new GraphQLNonNull(GraphQLInt)
      }
    }
  },
  round_averages: {
    type: new GraphQLList(_playerPerformance2.default),
    resolve: _setup.PlayerPerformance.RoundAverages,
    args: {
      id_season: {
        name: 'id_season',
        type: new GraphQLNonNull(GraphQLInt)
      }
    }
  },
  performances: {
    type: new GraphQLList(_playerPerformance2.default),
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

exports.default = PlayerPerformanceQuery;