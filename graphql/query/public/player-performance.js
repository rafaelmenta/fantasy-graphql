import PlayerPerformanceType from '../../object-types/player-performance';
import {PlayerPerformance} from '../../../model/setup';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} =  graphql;

const PlayerPerformanceQuery = {
  performance: {
    type: PlayerPerformanceType,
    resolve: resolver(PlayerPerformance),
    args: {
      id_player_performance: {
        name : 'id_player_performance',
        type : new GraphQLNonNull(GraphQLInt)
      }
    }
  },
  round_averages: {
    type: new GraphQLList(PlayerPerformanceType),
    resolve: PlayerPerformance.RoundAverages,
    args: {
      id_season: {
        name: 'id_season',
        type: new GraphQLNonNull(GraphQLInt)
      }
    }
  },
  performances: {
    type: new GraphQLList(PlayerPerformanceType),
    resolve: resolver(PlayerPerformance),
    args : {
      id_round : {
        name : 'id_round',
        type : new GraphQLList(GraphQLInt)
      },
      id_player : {
        name : 'id_player',
        type : new GraphQLList(GraphQLInt)
      }
    }
  }
}

export default PlayerPerformanceQuery;
