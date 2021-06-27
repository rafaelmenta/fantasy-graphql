"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Auction = void 0;

var _graphql = require("graphql");

var _playerBid = require("./player-bid");

var _setup = require("../../model/setup");

var _graphqlSequelize = require("graphql-sequelize");

var _league = _interopRequireDefault(require("./league"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Auction = new _graphql.GraphQLObjectType({
  name: 'Auction',
  fields: function fields() {
    return {
      id_auction: {
        type: _graphql.GraphQLInt
      },
      id_league: {
        type: _graphql.GraphQLInt
      },
      status: {
        type: _graphql.GraphQLInt
      },
      date_started: {
        type: _graphql.GraphQLString
      },
      date_ended: {
        type: _graphql.GraphQLString
      },
      league: {
        type: _league["default"],
        resolve: (0, _graphqlSequelize.resolver)(_setup.Auction.League)
      },
      bids: {
        type: new _graphql.GraphQLList(_playerBid.PlayerBid),
        resolve: (0, _graphqlSequelize.resolver)(_setup.Auction.Bids)
      }
    };
  }
});
exports.Auction = Auction;