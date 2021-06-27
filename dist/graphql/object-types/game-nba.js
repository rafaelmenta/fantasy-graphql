"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _teamNba = _interopRequireDefault(require("./team-nba"));

var _round = _interopRequireDefault(require("./round"));

var _setup = require("../../model/setup");

var _graphqlDate = _interopRequireDefault(require("graphql-date"));

var _dottie = _interopRequireDefault(require("dottie"));

var _connection = _interopRequireDefault(require("../../database/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLBoolean = graphql.GraphQLBoolean,
    GraphQLList = graphql.GraphQLList;
var GameNbaType = new GraphQLObjectType({
  name: 'GameNba',
  fields: function fields() {
    return {
      id_game_nba: {
        type: GraphQLInt
      },
      away_team: {
        type: _teamNba["default"],
        resolve: resolver(_setup.GameNba.HomeTeam)
      },
      home_team: {
        type: _teamNba["default"],
        resolve: resolver(_setup.GameNba.AwayTeam)
      },
      round_away: {
        type: _round["default"],
        resolve: resolver(_setup.GameNba.AwayRound)
      },
      round_home: {
        type: _round["default"],
        resolve: resolver(_setup.GameNba.HomeRound)
      },
      manual_home_team: {
        type: _teamNba["default"],
        resolve: function resolve(game) {
          return _dottie["default"].transform(game.dataValues).home;
        }
      },
      manual_away_team: {
        type: _teamNba["default"],
        resolve: function resolve(game) {
          return _dottie["default"].transform(game.dataValues).away;
        }
      },
      manual_round_home: {
        type: _round["default"],
        resolve: function resolve(game) {
          return _dottie["default"].transform(game.dataValues).home_round;
        }
      },
      manual_round_away: {
        type: _round["default"],
        resolve: function resolve(game) {
          return _dottie["default"].transform(game.dataValues).away_round;
        }
      },
      manual_is_done: {
        type: GraphQLBoolean,
        resolve: function resolve(game) {
          return _connection["default"].query("\n        SELECT count(*) as count\n        FROM player_performance\n        JOIN player ON player_performance.id_player=player.id_player\n        WHERE minutes > 0\n          AND (\n            (id_round=".concat(game.dataValues['home_round.id_round'], " AND id_nba=").concat(game.dataValues['home.id_nba'], ")\n            OR\n            (id_round=").concat(game.dataValues['away_round.id_round'], " AND id_nba=").concat(game.dataValues['away.id_nba'], ")\n          )\n        "), {
            raw: true,
            plain: true
          }).then(function (result) {
            return result.count > 0;
          });
        }
      },
      game_time: {
        type: _graphqlDate["default"]
      },
      is_finished: {
        type: GraphQLBoolean
      },
      external_id: {
        type: GraphQLString
      }
    };
  }
});
var _default = GameNbaType;
exports["default"] = _default;