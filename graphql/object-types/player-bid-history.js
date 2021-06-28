import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLFloat, GraphQLList } from 'graphql';
import { PlayerBidHistory as PlayerBidHistoryModel } from '../../model/setup';
import PlayerType from './player';
import { PlayerBid } from './player-bid';
import TeamSlType from './team-sl';

const resolver = require('graphql-sequelize').resolver;

export const PlayerBidHistory = new GraphQLObjectType({
  name: 'PlayerBidHistory',
  fields: () => ({
    id_bid: { type: GraphQLInt },
    id_bid: { type: GraphQLInt },
    id_sl: { type: GraphQLInt },
    id_player: { type: GraphQLInt },
    bid_time: { type: GraphQLString },
    salary: { type: GraphQLFloat },
    years: { type: GraphQLInt },

    player: {
      type: PlayerType,
      resolve: resolver(PlayerBidHistoryModel.Player),
    },

    team: {
      type: TeamSlType,
      resolve: resolver(PlayerBidHistoryModel.Team),
    },

    bid: {
      type: PlayerBid,
      resolve: resolver(PlayerBidHistoryModel.Bid),
    },
  }),
});
