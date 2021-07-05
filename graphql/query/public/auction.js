import { Auction as AuctionType } from '../../object-types/auction';
import { Auction, LeagueConfig, PlayerBid } from '../../../model/setup';
import { PlayerBid as PlayerBidType } from '../../object-types/player-bid';
import LeagueConfigType from '../../object-types/league-config';

import "core-js/stable";
import "regenerator-runtime/runtime";

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
  rules: {
    type: new GraphQLList(LeagueConfigType),
    args: {id_auction: {type: new GraphQLNonNull(GraphQLInt)}},
    resolve: async (root, {id_auction}) => {
      const auction = await Auction.find({where: {id_auction}});
      if (!auction) { throw new Error('AUCTION_NOT_FOUND'); }

      const id_league = auction.id_league;
      const configs = await LeagueConfig.findAll({where: {id_league}});
      const auctionConfigs = [
        'AUCTION_MIN_BID',
        'AUCTION_MAX_BID',
        'AUCTION_BID_INCREMENT',
        'AUCTION_BID_OFFSET_TIME',
      ];

      return configs.filter(config => auctionConfigs.includes(config.id_config));
    },
  }
};
