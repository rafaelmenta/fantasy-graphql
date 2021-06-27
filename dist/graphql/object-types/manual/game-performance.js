"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManualGamePerformanceQuery = exports.ManualGamePerformance = void 0;

var _graphql = require("graphql");

var _player = _interopRequireDefault(require("../player"));

var _setup = require("../../../model/setup");

var _gameNba = _interopRequireDefault(require("../../../model/game-nba"));

var _teamNba = _interopRequireDefault(require("../team-nba"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ManualPlayerGamePerformance = new _graphql.GraphQLObjectType({
  name: 'ManualPlayerGamePerformance',
  fields: function fields() {
    return {
      player: {
        type: _player["default"]
      },
      id_player_performance: {
        type: _graphql.GraphQLInt
      },
      minutes: {
        type: _graphql.GraphQLInt
      },
      field_goal_attempts: {
        type: _graphql.GraphQLInt
      },
      free_throw_attempts: {
        type: _graphql.GraphQLInt
      },
      points: {
        type: _graphql.GraphQLInt
      },
      defensive_rebounds: {
        type: _graphql.GraphQLInt
      },
      offensive_rebounds: {
        type: _graphql.GraphQLInt
      },
      assists: {
        type: _graphql.GraphQLInt
      },
      steals: {
        type: _graphql.GraphQLInt
      },
      blocks: {
        type: _graphql.GraphQLInt
      },
      turnovers: {
        type: _graphql.GraphQLInt
      },
      personal_fouls: {
        type: _graphql.GraphQLInt
      },
      win_loss: {
        type: _graphql.GraphQLInt
      }
    };
  }
});
var ManualGamePerformance = new _graphql.GraphQLObjectType({
  name: 'ManualGamePerformance',
  fields: function fields() {
    return {
      home: {
        type: _teamNba["default"]
      },
      away: {
        type: _teamNba["default"]
      },
      id_round_home: {
        type: _graphql.GraphQLInt
      },
      id_round_away: {
        type: _graphql.GraphQLInt
      },
      home_performances: {
        type: new _graphql.GraphQLList(ManualPlayerGamePerformance)
      },
      away_performances: {
        type: new _graphql.GraphQLList(ManualPlayerGamePerformance)
      }
    };
  }
}); // Export query ------------------------------------------------------------------------------------

exports.ManualGamePerformance = ManualGamePerformance;
var ManualGamePerformanceQuery = {
  type: ManualGamePerformance,
  args: {
    id_game_nba: {
      name: 'id_game_nba',
      type: _graphql.GraphQLInt
    }
  },
  resolve: function resolve(root, _ref) {
    var id_game_nba = _ref.id_game_nba;
    return _gameNba["default"].findOne({
      where: {
        id_game_nba: id_game_nba
      }
    }).then(function (game) {
      var home = _setup.TeamNba.findOne({
        where: {
          id_nba: game.id_home
        }
      });

      var away = _setup.TeamNba.findOne({
        where: {
          id_nba: game.id_away
        }
      });

      var home_performances = _setup.PlayerPerformance.findAll({
        include: [{
          model: _setup.Player,
          where: {
            id_nba: game.id_home
          }
        }],
        where: {
          id_round: game.id_round_home
        }
      });

      var away_performances = _setup.PlayerPerformance.findAll({
        include: [{
          model: _setup.Player,
          where: {
            id_nba: game.id_away
          }
        }],
        where: {
          id_round: game.id_round_away
        }
      });

      return Promise.all([home, away, home_performances, away_performances]).then(function (results) {
        return {
          home: results[0],
          away: results[1],
          id_round_home: game.id_round_home,
          id_round_away: game.id_round_away,
          home_performances: results[2],
          away_performances: results[3]
        };
      });
    });
  }
};
exports.ManualGamePerformanceQuery = ManualGamePerformanceQuery;