import PlayerType from '../../object-types/player';
import Player from '../../../model/player';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} =  graphql;

const PlayerQuery = {
  player: {
    type: PlayerType,
    resolve: resolver(Player),
    args: {
      id_player: {
        name : 'id_player',
        type : GraphQLInt
      },
      player_slug: {
        name: 'player_slug',
        type: GraphQLString
      }
    }
  }
  ,
  players: {
      type: new GraphQLList(PlayerType),
      resolve: () => Player.findAll({
        where: { retired: false },
      })
  }
}

export default PlayerQuery;
