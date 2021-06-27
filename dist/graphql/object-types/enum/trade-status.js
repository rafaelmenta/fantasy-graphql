"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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
var _default = TradeStatus;
exports["default"] = _default;