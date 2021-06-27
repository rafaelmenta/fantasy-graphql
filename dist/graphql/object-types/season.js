"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _round = _interopRequireDefault(require("./round"));

var _setup = require("../../model/setup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLBoolean = graphql.GraphQLBoolean,
    GraphQLList = graphql.GraphQLList;
var SeasonType = new GraphQLObjectType({
  name: 'Season',
  fields: function fields() {
    return {
      id_season: {
        type: GraphQLInt
      },
      year: {
        type: GraphQLString
      },
      current: {
        type: GraphQLBoolean
      },
      rounds: {
        type: new GraphQLList(_round["default"]),
        resolve: resolver(_setup.Season.Rounds)
      }
    };
  }
});
var _default = SeasonType;
exports["default"] = _default;