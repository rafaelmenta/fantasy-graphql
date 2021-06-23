import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLFloat, GraphQLList } from 'graphql';
import { PlayerBid as PlayerBidModel, TeamSl } from '../../model/setup';
import PlayerType from './player';
import TeamSlType from './team-sl';

const resolver = require('graphql-sequelize').resolver;

export const PlayerBid = new GraphQLObjectType({
  name: 'PlayerBid',
  fields: () => ({
    id_bid: { type: GraphQLInt },
    id_auction: { type: GraphQLInt },
    id_sl: { type: GraphQLInt },
    id_player: { type: GraphQLInt },
    expiration: { type: GraphQLString },
    salary: { type: GraphQLFloat },
    years: { type: GraphQLInt },

    player: {
      type: PlayerType,
      resolve: resolver(PlayerBidModel.Player),
    },

    team: {
      type: TeamSlType,
      resolve: resolver(PlayerBidModel.Team),
    },
  }),
});
