'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoundMutation = undefined;

var _graphql = require('graphql');

var _connection = require('../../../database/connection');

var _connection2 = _interopRequireDefault(_connection);

var _teamPerformance = require('../../../model/team-performance');

var _teamPerformance2 = _interopRequireDefault(_teamPerformance);

var _game = require('../../../model/game');

var _game2 = _interopRequireDefault(_game);

var _gameType = require('../../object-types/enum/game-type');

var _gameType2 = _interopRequireDefault(_gameType);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _round = require('../../../model/round');

var _round2 = _interopRequireDefault(_round);

var _setup = require('../../../model/setup');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function openRound(root, _ref) {
  var id_round = _ref.id_round;

  // 1 - Create player performance
  var createPlayerPerformance = '\n    INSERT INTO player_performance(id_player, id_round)\n    (SELECT id_player, ' + id_round + ' FROM player WHERE retired = false);\n  ';

  // 2 - Create team performance
  var createTeamPerformance = '\n    INSERT INTO team_performance(id_sl, id_round, minutes_pg, minutes_sg, minutes_sf, minutes_pf, minutes_c)\n    (SELECT id_sl, ' + id_round + ', 48, 48, 48, 48, 48 FROM team_sl);\n  ';

  // 3 - Create player team performance
  var createPlayerTeamPerformance = '\n    INSERT INTO player_team_performance(id_player, id_round, id_sl, `order`, primary_position, secondary_position)\n    (SELECT DISTINCT id_player, ' + id_round + ', id_sl, `order`, primary_position, secondary_position FROM team_player);\n  ';

  // 4 - Update round as opened
  var updateRound = '\n    UPDATE round SET opened = true WHERE id_round = ' + id_round + ';\n  ';

  return _connection2.default.transaction(function (t) {
    return _connection2.default.query(createPlayerPerformance, { transaction: t }).then(function () {
      return _connection2.default.query(createTeamPerformance, { transaction: t });
    }).then(function () {
      return _connection2.default.query(createPlayerTeamPerformance, { transaction: t });
    }).then(function () {
      return _connection2.default.query(updateRound, { transaction: t });
    }).then(function (results) {
      return results[0].affectedRows === 1;
    });
  });
}

function closeRound(root, _ref2) {
  var id_round = _ref2.id_round;

  // 0 - Is the round already closed?
  var round = _round2.default.findOne({ where: { id_round: id_round } });

  // 1 - Get team performances
  var teams = _teamPerformance2.default.findAll({ where: { id_round: id_round } }).then(function (teams) {
    return teams.reduce(function (map, team) {
      map[team.id_sl] = team;return map;
    });
  }, {});

  // 2 - Get regular season games
  var games = _game2.default.findAll({ where: { id_round: id_round, id_type: _gameType2.default.parseValue('LEAGUE') } });

  return Promise.all([teams, games, round]).then(function (results) {
    var teamMap = results[0];
    var games = results[1];
    var round = results[2];

    if (round.processed) {
      return false;
    }

    return _connection2.default.transaction(function (t) {
      var _ref3;

      var gameUpdates = games.map(function (game) {
        var home = teamMap[game.home_team];
        var away = teamMap[game.away_team];

        if (home && away) {
          // 3 - Compare scores (consider +-3)
          var homeScore = home.fantasy_points + 3;
          var awayScore = away.fantasy_points - 3;

          var homeQuery = void 0;
          var awayQuery = void 0;
          // 4 - Update teams reocrds
          if (homeScore > awayScore) {
            homeQuery = _setup.TeamSeason.update({ win: _sequelize2.default.literal('win + 1') }, { where: { id_sl: home.id_sl }, transaction: t });
            awayQuery = _setup.TeamSeason.update({ loss: _sequelize2.default.literal('loss + 1') }, { where: { id_sl: away.id_sl }, transaction: t });
          } else {
            awayQuery = _setup.TeamSeason.update({ loss: _sequelize2.default.literal('win + 1') }, { where: { id_sl: away.id_sl }, transaction: t });
            homeQuery = _setup.TeamSeason.update({ win: _sequelize2.default.literal('loss + 1') }, { where: { id_sl: home.id_sl }, transaction: t });
          }
          return Promise.all[(homeQuery, awayQuery)];
        }
      });

      // 5 - Update round as processed
      return Promise.all((_ref3 = []).concat.apply(_ref3, _toConsumableArray(gameUpdates))).then(function () {
        return _round2.default.update({ processed: true }, { where: { id_round: id_round }, transaction: t });
      }).then(function (results) {
        return results[0] === 1;
      });
    });
  });
}

var RoundMutation = exports.RoundMutation = {
  openRound: {
    description: 'Open a fantasy round',
    type: _graphql.GraphQLBoolean,
    args: {
      id_round: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) }
    },
    resolve: openRound
  },
  closeRound: {
    description: 'Close a fantasy round',
    type: _graphql.GraphQLBoolean,
    args: {
      id_round: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) }
    },
    resolve: closeRound
  }
};