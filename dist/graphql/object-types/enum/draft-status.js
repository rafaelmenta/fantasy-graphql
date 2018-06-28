'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var graphql = require('graphql');

var GraphQLEnumType = graphql.GraphQLEnumType;


var DraftStatus = new GraphQLEnumType({
  name: 'DraftStatus',
  values: {
    STATUS_CLOSED: {
      value: 0
    },
    STATUS_OPEN: {
      value: 1
    },
    STATUS_FINISHED: {
      value: 2
    }
  }
});

exports.default = DraftStatus;