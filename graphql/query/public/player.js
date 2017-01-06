import PlayerType from '../../object-types/player';
import {Player} from '../../../model/setup';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} =  graphql;

const PlayerQuery = {
  player: {
    type: PlayerType,
    resolve: resolver(Player),
    args: {
      id_player: {
        name : 'id_player',
        type : new GraphQLNonNull(GraphQLInt)
      }
    }
  }
  ,
  players: {
      type: new GraphQLList(PlayerType),
      resolve: resolver(Player)
  }
}

export default PlayerQuery;