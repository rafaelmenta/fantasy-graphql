'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _game = require('./game');

var _game2 = _interopRequireDefault(_game);

var _playerPerformance = require('./player-performance');

var _playerPerformance2 = _interopRequireDefault(_playerPerformance);

var _setup = require('../../model/setup');

var _graphqlDate = require('graphql-date');

var _graphqlDate2 = _interopRequireDefault(_graphqlDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLBoolean = graphql.GraphQLBoolean,
    GraphQLList = graphql.GraphQLList;


var RoundType = new GraphQLObjectType({
  name: 'Round',
  fields: function fields() {
    return {
      id_round: {
        type: GraphQLInt
      },
      description: {
        type: GraphQLString
      },
      round_number: {
        type: GraphQLInt
      },
      id_season: {
        type: GraphQLInt
      },
      open_date: {
        type: _graphqlDate2.default
      },
      close_date: {
        type: _graphqlDate2.default
      },
      processed: {
        type: GraphQLBoolean
      },
      games: {
        type: new GraphQLList(_game2.default),
        resolve: resolver(_setup.Round.Games)
      }
    };
  }
});

exports.default = RoundType;