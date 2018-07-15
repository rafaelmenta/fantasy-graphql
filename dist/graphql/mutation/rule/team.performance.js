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

/*
function calculate_valid_fps($id_round){

  $teams = $this->team_performance_model->find_teams_by_round($id_round);
        foreach ($teams as $team) {

                $minutes['PG'] = 48;
                $minutes['SG'] = 48;
                $minutes['SF'] = 48;
                $minutes['PF'] = 48;
                $minutes['C'] = 48;

                $team_fps = 0;

                $performance_players = $this->player_performance_model->find_team_players_performance($team->id_sl, $id_round);

                foreach ($performance_players as $player) {
                        $player_team = $this->player_team_performance_model->retrieve($player->ptp_code);
                        $player_team = $player_team[0];

                        $player_team->minutes_primary = 0;
                        $player_team->minutes_secondary = 0;
                        $player_team->fantasy_points = 0;

                        // Jogador jogou menos que o dispon�vel
                        if ($player->minutes > 0 && $player->minutes <= $minutes[$player->primary_position]) {
                                $player_team->fantasy_points = $player->fantasy_points;
                                $player_team->minutes_primary = $player->minutes;
                                $minutes[$player->primary_position] -= $player->minutes;

                        // Jogador jogou mais que o dispon�vel na primeira
                        } else if ($player->minutes > 0 && $minutes[$player->primary_position] > 0) {
                                $fpm = $player->fantasy_points / $player->minutes;
                                $fp_total = number_format($fpm * $minutes[$player->primary_position],3);
                                $player_team->minutes_primary = $minutes[$player->primary_position];
                                $player->minutes -= $player_team->minutes_primary;
                                $minutes[$player->primary_position] = 0;

                                // Mas jogou menos que o dispon�vel na segunda
                                if ($player->minutes <= $minutes[$player->secondary_position]) {
                                        $player_team->minutes_secondary = $player->minutes;
                                        $player_team->fantasy_points = $player->fantasy_points;
                                        $minutes[$player->secondary_position] -= $player->minutes;

                                // E jogou mais que o dispon�vel na segunda
                                } else {
                                        $fp_total += number_format($fpm * $minutes[$player->secondary_position],3);
                                        $player_team->minutes_secondary = $minutes[$player->secondary_position];
                                        $player_team->fantasy_points = $fp_total;
                                        $minutes[$player->secondary_position] = 0;
                                }

                        // Jogou menos que o dispon�vel na segunda
                        } else if ($player->minutes > 0 && $player->minutes <= $minutes[$player->secondary_position]) {
                                $player_team->fantasy_points = $player->fantasy_points;
                                $player_team->minutes_secondary = $player->minutes;
                                $minutes[$player->secondary_position] -= $player->minutes;

                        // Jogou mais que o dispon�vel na segunda
                        } else if ($player->minutes > 0 && $minutes[$player->secondary_position] > 0){
                                $fpm = $player->fantasy_points / $player->minutes;
                                $player_team->fantasy_points = number_format($fpm * $minutes[$player->secondary_position],3);
                                $player_team->minutes_secondary = $minutes[$player->secondary_position];
                                $minutes[$player->secondary_position] = 0;
                        }
                        $count = 0;
                        $this->player_team_performance_model->update($player_team, $player_team->ptp_code);
                        $team_fps += $player_team->fantasy_points;
                }

                $team_performance['minutes_pg'] = $minutes['PG'];
                $team_performance['minutes_sg'] = $minutes['SG'];
                $team_performance['minutes_sf'] = $minutes['SF'];
                $team_performance['minutes_pf'] = $minutes['PF'];
                $team_performance['minutes_c'] = $minutes['C'];
                $team_performance['fantasy_points'] = $team_fps;

                $this->team_performance_model->update($team_performance, $team->tpf_code);
        }
}
*/