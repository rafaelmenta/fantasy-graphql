"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuctionStatus = void 0;

var graphql = require('graphql');

var GraphQLEnumType = graphql.GraphQLEnumType;
var AuctionStatus = new GraphQLEnumType({
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
exports.AuctionStatus = AuctionStatus;