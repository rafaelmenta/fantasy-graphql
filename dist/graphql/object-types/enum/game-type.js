"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var graphql = require('graphql');

var GraphQLEnumType = graphql.GraphQLEnumType;
var GameType = new GraphQLEnumType({
  name: 'GameType',
  values: {
    LEAGUE: {
      value: 1
    },
    PLAYOFF: {
      value: 2
    },
    FRIENDLY: {
      value: 3
    }
  }
});
var _default = GameType;
exports["default"] = _default;