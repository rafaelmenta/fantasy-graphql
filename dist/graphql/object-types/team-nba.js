"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _player = _interopRequireDefault(require("./player"));

var _teamNba = _interopRequireDefault(require("../../model/team-nba"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList;
var TeamNbaType = new GraphQLObjectType({
  name: 'TeamNba',
  fields: function fields() {
    return {
      id_nba: {
        type: GraphQLInt
      },
      city: {
        type: GraphQLString
      },
      nickname: {
        type: GraphQLString
      },
      symbol: {
        type: GraphQLString
      },
      slug: {
        type: GraphQLString
      },
      primary_color: {
        type: GraphQLString
      },
      secondary_color: {
        type: GraphQLString
      },
      players: {
        type: new GraphQLList(_player["default"]),
        resolve: resolver(_teamNba["default"].Players)
      }
    };
  }
});
var _default = TeamNbaType;
exports["default"] = _default;