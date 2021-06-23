'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Auction = undefined;

var _graphql = require('graphql');

var Auction = exports.Auction = new _graphql.GraphQLObjectType({
  name: 'Auction',
  fields: function fields() {
    return {
      id_auction: { type: _graphql.GraphQLInt },
      id_league: { type: _graphql.GraphQLInt },
      status: { type: _graphql.GraphQLInt },
      date_started: { type: _graphql.GraphQLString },
      date_ended: { type: _graphql.GraphQLString }
    };
  }
});