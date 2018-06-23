'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _playerTeamPerformance = require('../../object-types/player-team-performance');

var _playerTeamPerformance2 = _interopRequireDefault(_playerTeamPerformance);

var _setup = require('../../../model/setup');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLString = graphql.GraphQLString,
    GraphQLNonNull = graphql.GraphQLNonNull;


var PlayerTeamPerformanceQuery = {
  // performance: {
  //   type: PlayerPerformanceType,
  //   resolve: resolver(PlayerPerformance),
  //   args: {
  //     id_player_performance: {
  //       name : 'id_player_performance',
  //       type : new GraphQLNonNull(GraphQLInt)
  //     }
  //   }
  // },
  player_team_performances: {
    type: new GraphQLList(_playerTeamPerformance2.default),
    resolve: resolver(_setup.PlayerTeamPerformance),
    args: {
      id_round: {
        name: 'id_round',
        type: new GraphQLList(GraphQLInt)
      },
      id_player: {
        name: 'id_player',
        type: new GraphQLList(GraphQLInt)
      },
      id_sl: {
        name: 'id_sl',
        type: new GraphQLList(GraphQLInt)
      },
      orderBy: {
        name: 'orderBy',
        type: GraphQLString
      }
    }
  }
};

exports.default = PlayerTeamPerformanceQuery;