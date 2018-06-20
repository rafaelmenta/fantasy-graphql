'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _player = require('./player');

var _player2 = _interopRequireDefault(_player);

var _teamNba = require('../../model/team-nba');

var _teamNba2 = _interopRequireDefault(_teamNba);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      primary_color: { type: GraphQLString },
      secondary_color: { type: GraphQLString },
      players: {
        type: new GraphQLList(_player2.default),
        resolve: resolver(_teamNba2.default.Players)
      }
    };
  }
});

exports.default = TeamNbaType;