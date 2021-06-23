import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } from 'graphql';

import { PlayerBid } from './player-bid';
import { Auction as AuctionModel } from '../../model/setup';
import { resolver } from 'graphql-sequelize';
import LeagueType from './league';

export const Auction = new GraphQLObjectType({
  name: 'Auction',
  fields: () => ({
    id_auction: { type: GraphQLInt },
    id_league: { type: GraphQLInt },
    status: { type: GraphQLInt },
    date_started: { type: GraphQLString },
    date_ended: { type: GraphQLString },

    league: {
      type: LeagueType,
      resolve: resolver(AuctionModel.League),
    },

    bids: {
      type: new GraphQLList(PlayerBid),
      resolve: resolver(AuctionModel.Bids),
    },
  }),
});
