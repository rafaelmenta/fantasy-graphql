import { Auction as AuctionType } from '../../object-types/auction';
import { Auction, PlayerBid } from '../../../model/setup';
import { PlayerBid as PlayerBidType } from '../../object-types/player-bid';

const graphql = require('graphql'),
  resolver = require('graphql-sequelize').resolver;

const {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

export const AuctionQuery = {
  auctions: {
    type: new GraphQLList(AuctionType),
    resolve: resolver(Auction),
  },
  auction: {
    type: AuctionType,
    resolve: resolver(Auction),
    args: {
      id_auction: {
        type: new GraphQLNonNull(GraphQLInt),
        name: 'id_auction',
      },
    },
  },
  league_auctions: {
    type: new GraphQLList(AuctionType),
    resolve: resolver(Auction),
    args: {
      id_league: {
        type: new GraphQLNonNull(GraphQLInt),
        name: 'id_league',
      },
    },
  },
  bids: {
    type: new GraphQLList(PlayerBidType),
    resolve: resolver(PlayerBid),
    args: {
      id_auction: {
        type: new GraphQLNonNull(GraphQLInt),
        name: 'id_auction',
      }
    }
  },
};
