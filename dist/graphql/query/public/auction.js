'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuctionQuery = undefined;

var _auction = require('../../object-types/auction');

var _setup = require('../../../model/setup');

var _playerBid = require('../../object-types/player-bid');

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLNonNull = graphql.GraphQLNonNull;
var AuctionQuery = exports.AuctionQuery = {
  auctions: {
    type: new GraphQLList(_auction.Auction),
    resolve: resolver(_setup.Auction)
  },
  auction: {
    type: _auction.Auction,
    resolve: resolver(_setup.Auction),
    args: {
      id_auction: {
        type: new GraphQLNonNull(GraphQLInt),
        name: 'id_auction'
      }
    }
  },
  league_auctions: {
    type: new GraphQLList(_auction.Auction),
    resolve: resolver(_setup.Auction),
    args: {
      id_league: {
        type: new GraphQLNonNull(GraphQLInt),
        name: 'id_league'
      }
    }
  },
  bids: {
    type: new GraphQLList(_playerBid.PlayerBid),
    resolve: resolver(_setup.PlayerBid),
    args: {
      id_auction: {
        type: new GraphQLNonNull(GraphQLInt),
        name: 'id_auction'
      }
    }
  }
};