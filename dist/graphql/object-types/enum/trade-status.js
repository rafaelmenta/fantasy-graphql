'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var graphql = require('graphql');
var GraphQLEnumType = graphql.GraphQLEnumType;


var TradeStatus = new GraphQLEnumType({
  name: 'TradeStatus',
  values: {
    PENDING: {
      value: 1
    },
    ACCEPTED: {
      value: 2
    },
    REFUSED: {
      value: 3
    },
    CANCELLED: {
      value: 4
    }
  }
});

exports.default = TradeStatus;