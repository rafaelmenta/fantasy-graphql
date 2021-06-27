"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLBoolean = graphql.GraphQLBoolean,
    GraphQLList = graphql.GraphQLList;
var TeamSeasonType = new GraphQLObjectType({
  name: 'TeamSeason',
  fields: function fields() {
    return {
      ts_code: {
        type: GraphQLInt
      },
      id_sl: {
        type: GraphQLInt
      },
      id_season: {
        type: GraphQLInt
      },
      win: {
        type: GraphQLInt
      },
      loss: {
        type: GraphQLInt
      }
    };
  }
});
var _default = TeamSeasonType;
exports["default"] = _default;