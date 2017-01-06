import PlayerStatsType from '../../object-types/player-stats';
import {PlayerStats} from '../../../model/setup';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} =  graphql;

const PlayerStatsQuery = {
  player_averages : {
    type: new GraphQLList(PlayerStatsType),
    resolve: resolver(PlayerStats),
    args: {
      id_player: {
        name : 'id_player',
        type : new GraphQLNonNull(GraphQLInt)
      }
    }
  },
  season_averages : {
    type: new GraphQLList(PlayerStatsType),
    resolve: resolver(PlayerStats),
    args: {
      id_season: {
        name : 'id_season',
        type : new GraphQLNonNull(GraphQLInt)
      }
    }
  },
  averages: {
    type: new GraphQLList(PlayerStatsType),
    resolve: resolver(PlayerStats),
    args : {
      id_season : {
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

export default PlayerStatsQuery;