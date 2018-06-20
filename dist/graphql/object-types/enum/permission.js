'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var graphql = require('graphql');

var GraphQLEnumType = graphql.GraphQLEnumType;


var PermissionType = new GraphQLEnumType({
  name: 'Permission',
  values: {
    ADMIN: {
      value: 1
    },
    COMMISSIONER: {
      value: 2
    },
    UPDATER: {
      value: 3
    },
    USER: {
      value: 4
    },
    VISITOR: {
      value: 5
    }
  }
});

exports.default = PermissionType;