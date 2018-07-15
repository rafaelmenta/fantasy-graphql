'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameNbaMutation = undefined;

var _graphql = require('graphql');

var _gameNba = require('../../../model/game-nba');

var _gameNba2 = _interopRequireDefault(_gameNba);

var _playerPerformance = require('../../../model/player-performance');

var _playerPerformance2 = _interopRequireDefault(_playerPerformance);

var _connection = require('../../../database/connection');

var _connection2 = _interopRequireDefault(_connection);

var _setup = require('../../../model/setup');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GameNbaInput = new _graphql.GraphQLInputObjectType({
  name: 'GameNbaInput',
  fields: function fields() {
    return {
      id_away: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) },
      id_home: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) },
      id_round_home: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) },
      id_round_away: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) },
      game_time: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    };
  }
});

var PlayerPerformanceInput = new _graphql.GraphQLInputObjectType({
  name: 'PlayerPerformanceInput',
  fields: function fields() {
    return {
      id_player_performance: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) },
      minutes: { type: _graphql.GraphQLInt },
      field_goal_attempts: { type: _graphql.GraphQLInt },
      free_throw_attempts: { type: _graphql.GraphQLInt },
      points: { type: _graphql.GraphQLInt },
      defensive_rebounds: { type: _graphql.GraphQLInt },
      offensive_rebounds: { type: _graphql.GraphQLInt },
      assists: { type: _graphql.GraphQLInt },
      steals: { type: _graphql.GraphQLInt },
      blocks: { type: _graphql.GraphQLInt },
      turnovers: { type: _graphql.GraphQLInt },
      personal_fouls: { type: _graphql.GraphQLInt },
      win_loss: { type: _graphql.GraphQLInt }
    };
  }
});

var GameNbaMutation = exports.GameNbaMutation = {
  addNbaGame: {
    description: 'Create an NBA game',
    type: _graphql.GraphQLInt,
    args: { input: { type: GameNbaInput } },
    resolve: function resolve(root, _ref) {
      var input = _ref.input;
      return _gameNba2.default.create(input).then(function (game) {
        return game.id_game_nba;
      });
    }
  },
  deleteNbaGame: {
    description: 'Delete an NBA game',
    type: _graphql.GraphQLInt,
    args: {
      id_game_nba: { type: _graphql.GraphQLInt }
    },
    resolve: function resolve(root, _ref2) {
      var id_game_nba = _ref2.id_game_nba;
      return _gameNba2.default.destroy({ where: { id_game_nba: id_game_nba } });
    }
  },
  saveNbaPerformances: {
    description: 'Save player performances',
    type: new _graphql.GraphQLList(new _graphql.GraphQLList(_graphql.GraphQLInt)),
    args: {
      performances: { type: new _graphql.GraphQLList(PlayerPerformanceInput) }
    },
    resolve: function resolve(root, _ref3) {
      var performances = _ref3.performances;
      return _connection2.default.transaction(function (t) {
        var updates = performances.filter(function (perf) {
          return perf.minutes !== 0;
        }).map(function (perf) {
          perf.fantasy_points = calculateFantasyPoints(perf).toFixed(2);
          return _playerPerformance2.default.update(perf, {
            where: { id_player_performance: perf.id_player_performance },
            transaction: t
          });
        });

        // PlayerTeamPerformance.findAll({where: {id_round: 700 }}).then(results => {
        //   console.warn('results', results);
        // });

        return Promise.all(updates);
      });
    }
  }
};

var calculateFantasyPoints = function calculateFantasyPoints(perf) {
  return perf.points - perf.field_goal_attempts * 0.4 - perf.free_throw_attempts * 0.2 + perf.offensive_rebounds * 1.2 + perf.defensive_rebounds + perf.assists * 1.1 + perf.steals * 1.2 + perf.blocks * 1.3 - perf.turnovers * 1.1 - perf.personal_fouls + perf.win_loss;
};