'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var graphql = require('graphql');

var GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLInputObjectType = graphql.GraphQLInputObjectType;


var UserInputType = new GraphQLInputObjectType({
  name: 'InputUser',
  description: 'A User',
  fields: function fields() {
    return {
      id_user: { type: GraphQLInt },
      login: { type: GraphQLString },
      first_name: { type: GraphQLString },
      last_name: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
      nickname: { type: GraphQLString },
      id_permission: { type: GraphQLInt }
    };
  }
});

exports.default = UserInputType;