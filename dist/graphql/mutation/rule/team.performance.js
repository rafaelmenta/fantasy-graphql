'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeamPerformanceMutation = undefined;

var _graphql = require('graphql');

var _gameNba = require('../../../model/game-nba');

var _gameNba2 = _interopRequireDefault(_gameNba);

var _playerPerformance = require('../../../model/player-performance');

var _playerPerformance2 = _interopRequireDefault(_playerPerformance);

var _connection = require('../../../database/connection');

var _connection2 = _interopRequireDefault(_connection);

var _setup = require('../../../model/setup');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var playerPerformanceMap = {};

var TeamPerformanceMutation = exports.TeamPerformanceMutation = {
  calculateTeamPoints: {
    description: 'Calculate Team points',
    type: new _graphql.GraphQLList(new _graphql.GraphQLList(new _graphql.GraphQLList(_graphql.GraphQLInt))),
    args: {
      rounds: { type: new _graphql.GraphQLList(_graphql.GraphQLInt) }
    },
    resolve: function resolve(root, _ref) {
      var rounds = _ref.rounds;

      // 1 - Get all player performances on rounds and save to a map
      return _playerPerformance2.default.findAll({ where: { id_round: rounds } }).then(function (perfs) {
        return perfs.forEach(function (perf) {
          return playerPerformanceMap[perf.id_player + '_' + perf.id_round] = perf;
        });
      }).then(function () {
        var roundUpdates = rounds.map(function (round) {
          // 2 - Find all team performances on a round
          return _setup.TeamPerformance.findAll({ where: { id_round: round } }).then(function (teams) {
            return _connection2.default.transaction(function (t) {
              var teamsUpdates = teams.map(function (team, index) {
                var minutes = { PG: 48, SG: 48, SF: 48, PF: 48, C: 48 };
                var score = 0;
                // 3 - Find all players of a team
                return _setup.PlayerTeamPerformance.findAll({
                  where: { id_sl: team.id_sl, id_round: round },
                  order: [['order', 'ASC']],
                  transaction: t
                }).then(function (players) {
                  return players.map(function (player) {
                    player.minutes_primary = 0;
                    player.minutes_secondary = 0;
                    player.fantasy_points = 0;

                    var perf = playerPerformanceMap[player.id_player + '_' + player.id_round];
                    var fpm = perf.fantasy_points / perf.minutes;

                    // Player has all minutes available on P1
                    if (perf.minutes > 0 && perf.minutes <= minutes[player.primary_position]) {
                      player.fantasy_points = perf.fantasy_points;
                      player.minutes_primary = perf.minutes;
                      minutes[player.primary_position] -= perf.minutes;

                      // Player exceeded P1 minutes
                    } else if (perf.minutes > 0 && minutes[player.primary_position] > 0) {
                      player.fantasy_points = fpm * minutes[player.primary_position];
                      player.minutes_primary = minutes[player.primary_position];
                      perf.minutes -= minutes[player.primary_position];
                      minutes[player.primary_position] = 0;

                      // Player fits on P2 minutes
                      if (perf.minutes < minutes[player.secondary_position]) {
                        player.minutes_secondary = perf.minutes;
                        player.fantasy_points = perf.fantasy_points;

                        // Player doesn't fit on P2 minutes
                      } else {
                        player.fantasy_points += fpm * minutes[player.secondary_position];
                        player.minutes_secondary = minutes[player.secondary_position];
                        minutes[player.secondary_position] = 0;
                      }

                      // Player has all minutes available on P2
                    } else if (perf.minutes > 0 && perf.minutes < minutes[player.secondary_position]) {
                      player.fantasy_points = perf.fantasy_points;
                      player.minutes_secondary = perf.minutes;
                      minutes[player.secondary_position] -= perf.minutes;

                      // Player exceeded P2 minutes
                    } else if (perf.minutes > 0 && minutes[player.secondary_position] > 0) {
                      player.fantasy_points = fpm * minutes[player.secondary_position];
                      player.minutes_secondary = minutes[player.secondary_position];
                      minutes[player.secondary_position] = 0;
                    }

                    score += player.fantasy_points;
                    return '\n                            UPDATE\n                              player_team_performance\n                            SET\n                              fantasy_points=' + player.fantasy_points.toFixed(3) + ',\n                              minutes_primary=' + player.minutes_primary + ',\n                              minutes_secondary=' + player.minutes_secondary + '\n                            WHERE\n                              ptp_code=' + player.ptp_code + ';';
                    // PlayerTeamPerformance.update({
                    //   fantasy_points: player.fantasy_points.toFixed(3),
                    //   minutes_primary: player.minutes_primary,
                    //   minutes_secondary: player.minutes_secondary,
                    // }, { where: { ptp_code: player.ptp_code }, transaction: t });
                  });
                }).then(function (playerUpdates) {
                  return _connection2.default.query(playerUpdates.join(' '), { transaction: t });
                }).then(function (playerUpdates) {
                  return _setup.TeamPerformance.update({
                    minutes_pg: minutes.PG,
                    minutes_sg: minutes.SG,
                    minutes_sf: minutes.SF,
                    minutes_pf: minutes.PF,
                    minutes_c: minutes.C,
                    fantasy_points: score.toFixed(3)
                  }, { where: { tpf_code: team.tpf_code }, transaction: t });
                });
              });
              return Promise.all(teamsUpdates);
            });
          });
        });
        return Promise.all(roundUpdates);
      });
    }
  }
};