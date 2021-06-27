"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _setup = require("../../model/setup");

var _player = _interopRequireDefault(require("./player"));

var _season = _interopRequireDefault(require("./season"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLFloat = graphql.GraphQLFloat,
    GraphQLBoolean = graphql.GraphQLBoolean,
    GraphQLList = graphql.GraphQLList;
var PlayerStatsType = new GraphQLObjectType({
  name: 'PlayerStats',
  fields: function fields() {
    var _ref;

    return _ref = {
      id_player: {
        type: GraphQLInt
      },
      id_round: {
        type: GraphQLInt
      },
      games: {
        type: GraphQLInt
      },
      minutes: {
        type: GraphQLFloat
      },
      field_goal_attempts: {
        type: GraphQLFloat
      },
      free_throw_attempts: {
        type: GraphQLFloat
      },
      points: {
        type: GraphQLFloat
      },
      defensive_rebounds: {
        type: GraphQLFloat
      },
      offensive_rebounds: {
        type: GraphQLFloat
      },
      assists: {
        type: GraphQLFloat
      },
      steals: {
        type: GraphQLFloat
      },
      blocks: {
        type: GraphQLFloat
      },
      turnovers: {
        type: GraphQLFloat
      },
      personal_fouls: {
        type: GraphQLFloat
      },
      fantasy_points: {
        type: GraphQLFloat
      }
    }, _defineProperty(_ref, "games", {
      type: GraphQLInt,
      resolve: _setup.PlayerStats.GamesPlayed
    }), _defineProperty(_ref, "player", {
      type: _player["default"],
      resolve: resolver(_setup.PlayerStats.Player)
    }), _defineProperty(_ref, "season", {
      type: _season["default"],
      resolve: resolver(_setup.PlayerStats.Season),
      args: {
        id_season: {
          type: new GraphQLList(GraphQLInt)
        }
      }
    }), _ref;
  }
});
var _default = PlayerStatsType;
exports["default"] = _default;