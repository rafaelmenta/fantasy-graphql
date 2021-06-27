"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var graphql = require('graphql');

var GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLInputObjectType = graphql.GraphQLInputObjectType;
var UserInputType = new GraphQLInputObjectType({
  name: 'InputUser',
  description: 'A User',
  fields: function fields() {
    return {
      id_user: {
        type: GraphQLInt
      },
      login: {
        type: GraphQLString
      },
      first_name: {
        type: GraphQLString
      },
      last_name: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      password: {
        type: GraphQLString
      },
      nickname: {
        type: GraphQLString
      },
      id_permission: {
        type: GraphQLInt
      }
    };
  }
});
var _default = UserInputType;
exports["default"] = _default;