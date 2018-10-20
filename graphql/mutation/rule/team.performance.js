'use strict'

import { GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLInputObjectType, GraphQLList } from 'graphql';
import GameNba from '../../../model/game-nba';
import PlayerPerformance from '../../../model/player-performance';
import Conn from '../../../database/connection';
import { PlayerTeamPerformance, TeamPerformance } from '../../../model/setup';


const playerPerformanceMap = {};

export const TeamPerformanceMutation = {
  calculateTeamPoints: {
    description: 'Calculate Team points',
    type: new GraphQLList(new GraphQLList(new GraphQLList(GraphQLInt))),
    args: {
      rounds: { type: new GraphQLList(GraphQLInt) }
    },
    resolve: (root, { rounds }) => {
      // 1 - Get all player performances on rounds and save to a map
      return PlayerPerformance.findAll({where: {id_round: rounds}})
        .then(perfs => perfs.forEach(perf  => playerPerformanceMap[`${perf.id_player}_${perf.id_round}`] = perf))
        .then(() => {
          const roundUpdates = rounds.map(round => {
            // 2 - Find all team performances on a round
            return TeamPerformance.findAll({ where: { id_round: round }})
              .then(teams => {
                return Conn.transaction(t => {
                  const teamsUpdates = teams.map((team, index) => {
                    const minutes = {PG: 48, SG: 48, SF: 48, PF: 48, C: 48};
                    let score = 0;
                    // 3 - Find all players of a team
                    return PlayerTeamPerformance.findAll({
                      where: {id_sl: team.id_sl, id_round: round},
                      order: [['order', 'ASC']],
                      transaction: t,
                    })
                      .then(players => {
                        return players.map(player => {
                          player.minutes_primary = 0;
                          player.minutes_secondary = 0;
                          player.fantasy_points = 0;

                          const perf = playerPerformanceMap[`${player.id_player}_${player.id_round}`];
                          const fpm = perf.fantasy_points/perf.minutes;

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
                          return `
                            UPDATE
                              player_team_performance
                            SET
                              fantasy_points=${player.fantasy_points.toFixed(3)},
                              minutes_primary=${player.minutes_primary},
                              minutes_secondary=${player.minutes_secondary}
                            WHERE
                              ptp_code=${player.ptp_code};`;
                          // PlayerTeamPerformance.update({
                          //   fantasy_points: player.fantasy_points.toFixed(3),
                          //   minutes_primary: player.minutes_primary,
                          //   minutes_secondary: player.minutes_secondary,
                          // }, { where: { ptp_code: player.ptp_code }, transaction: t });
                        });
                      })
                      .then(playerUpdates => Conn.query(playerUpdates.join(' '), {transaction: t}))
                      .then(playerUpdates => TeamPerformance.update({
                        minutes_pg: minutes.PG,
                        minutes_sg: minutes.SG,
                        minutes_sf: minutes.SF,
                        minutes_pf: minutes.PF,
                        minutes_c: minutes.C,
                        fantasy_points: score.toFixed(3),
                        }, { where: { tpf_code: team.tpf_code}, transaction: t }))
                      .then(() => {
                        const playerStats = `
                          UPDATE player_stats ps
                          JOIN player_stats_view v ON ps.id_player = v.id_player and ps.id_season = v.id_season
                          JOIN season s ON s.id_season=ps.id_season
                          SET
                            ps.games = v.games,
                            ps.minutes = v.minutes,
                            ps.points = v.points,
                            ps.field_goal_attempts = v.field_goal_attempts,
                            ps.free_throw_attempts = v.free_throw_attempts,
                            ps.offensive_rebounds = v.offensive_rebounds,
                            ps.defensive_rebounds = v.defensive_rebounds,
                            ps.assists = v.assists,
                            ps.turnovers = v.turnovers,
                            ps.steals = v.steals,
                            ps.blocks = v.blocks,
                            ps.personal_fouls = v.personal_fouls,
                            ps.fantasy_points_per_minutes = v.fantasy_points_per_minutes,
                            ps.fantasy_points = v.fantasy_points
                          WHERE s.current = true;`;
                        return Conn.query(playerStats, {transaction: t})
                      })
                      .then(() => {
                        const teamStats = `
                          UPDATE team_stats ts
                          JOIN team_stats_view v ON ts.id_sl = v.id_sl and ts.id_season=v.id_season
                          JOIN season s ON s.id_season=ps.id_season
                          SET
                            ts.fantasy_points = v.fantasy_points,
                            ts.minutes_pg = v.minutes_pg,
                            ts.minutes_sg = v.minutes_sg,
                            ts.minutes_sf = v.minutes_sf,
                            ts.minutes_pf = v.minutes_pf,
                            ts.minutes_c = v.minutes_c
                          WHERE s.current = true;`;
                        return Conn.query(teamStats, {transaction: t})
                      });
                  });
                  return Promise.all(teamsUpdates);
                 });
              });
          });
          return Promise.all(roundUpdates);
        });
    }
  },
};