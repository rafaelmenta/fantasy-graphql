'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var graphql = require('graphql');

var GraphQLEnumType = graphql.GraphQLEnumType;
var AuctionStatus = exports.AuctionStatus = new GraphQLEnumType({
  name: 'AuctionStatus',
  values: {
    STATUS_CLOSED: {
      value: 0
    },
    STATUS_OPEN: {
      value: 1
    }
  }
});