"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _setup = require("../../model/setup");

var _player = _interopRequireDefault(require("./player"));

var _round = _interopRequireDefault(require("./round"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLFloat = graphql.GraphQLFloat,
    GraphQLBoolean = graphql.GraphQLBoolean,
    GraphQLList = graphql.GraphQLList;
var PlayerPerformanceType = new GraphQLObjectType({
  name: 'PlayerPerformance',
  fields: function fields() {
    return {
      id_player_performance: {
        type: GraphQLInt
      },
      id_player: {
        type: GraphQLInt
      },
      id_round: {
        type: GraphQLInt
      },
      minutes: {
        type: GraphQLInt
      },
      field_goal_attempts: {
        type: GraphQLInt
      },
      free_throw_attempts: {
        type: GraphQLInt
      },
      points: {
        type: GraphQLInt
      },
      defensive_rebounds: {
        type: GraphQLInt
      },
      offensive_rebounds: {
        type: GraphQLInt
      },
      assists: {
        type: GraphQLInt
      },
      steals: {
        type: GraphQLInt
      },
      blocks: {
        type: GraphQLInt
      },
      turnovers: {
        type: GraphQLInt
      },
      personal_fouls: {
        type: GraphQLInt
      },
      win_loss: {
        type: GraphQLInt
      },
      fantasy_points: {
        type: GraphQLFloat
      },
      max_fantasy_points: {
        type: GraphQLFloat,
        resolve: function resolve(dataset) {
          return dataset.dataValues.max_fantasy_points;
        }
      },
      player: {
        type: _player["default"],
        resolve: resolver(_setup.PlayerPerformance.Player)
      },
      round: {
        type: _round["default"],
        resolve: resolver(_setup.PlayerPerformance.Round),
        args: {
          id_season: {
            name: 'id_season',
            type: GraphQLInt
          }
        }
      }
    };
  }
});
var _default = PlayerPerformanceType;
exports["default"] = _default;