'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _setup = require('../../model/setup');

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLBoolean = graphql.GraphQLBoolean,
    GraphQLList = graphql.GraphQLList;


var LeagueConfigType = new GraphQLObjectType({
  name: 'LeagueConfig',
  fields: function fields() {
    return {
      id_config: {
        type: GraphQLString
      },
      config_value: {
        type: GraphQLString
      }
    };
  }
});

exports.default = LeagueConfigType;