import PlayerTeamPerformanceType from '../../object-types/player-team-performance';
import {PlayerTeamPerformance} from '../../../model/setup';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} =  graphql;

const PlayerTeamPerformanceQuery = {
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
    type: new GraphQLList(PlayerTeamPerformanceType),
    resolve: resolver(PlayerTeamPerformance),
    args : {
      id_round : {
        name : 'id_round',
        type : new GraphQLList(GraphQLInt)
      },
      id_player : {
        name : 'id_player',
        type : new GraphQLList(GraphQLInt)
      },
      id_sl : {
        name : 'id_sl',
        type : new GraphQLList(GraphQLInt)
      },
      orderBy : {
        name : 'orderBy',
        type : GraphQLString
      }
    }
  }
}

export default PlayerTeamPerformanceQuery;
