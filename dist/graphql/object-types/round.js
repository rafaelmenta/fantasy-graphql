"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _game = _interopRequireDefault(require("./game"));

var _playerPerformance = _interopRequireDefault(require("./player-performance"));

var _setup = require("../../model/setup");

var _graphqlDate = _interopRequireDefault(require("graphql-date"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
        type: _graphqlDate["default"]
      },
      close_date: {
        type: _graphqlDate["default"]
      },
      processed: {
        type: GraphQLBoolean
      },
      opened: {
        type: GraphQLBoolean
      },
      games: {
        type: new GraphQLList(_game["default"]),
        resolve: resolver(_setup.Round.Games)
      }
    };
  }
});
var _default = RoundType;
exports["default"] = _default;