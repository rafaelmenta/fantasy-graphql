'use strict';

import {GraphQLInt, GraphQLNonNull, GraphQLBoolean} from 'graphql'
import Conn from '../../../database/connection';
import TeamPerformance from '../../../model/team-performance';
import Game from '../../../model/game';
import GameType from '../../object-types/enum/game-type';
import Sequelize from 'sequelize';
import Round from '../../../model/round';
import { TeamSeason } from '../../../model/setup';

function openRound(root, {id_round}) {
  // 1 - Create player performance
  const createPlayerPerformance = `
    INSERT INTO player_performance(id_player, id_round)
    (SELECT id_player, ${id_round} FROM player WHERE retired = false);
  `;

  // 2 - Create team performance
  const createTeamPerformance = `
    INSERT INTO team_performance(id_sl, id_round, minutes_pg, minutes_sg, minutes_sf, minutes_pf, minutes_c)
    (SELECT id_sl, ${id_round}, 48, 48, 48, 48, 48 FROM team_sl);
  `;

  // 3 - Create player team performance
  const createPlayerTeamPerformance = `
    INSERT INTO player_team_performance(id_player, id_round, id_sl, \`order\`, primary_position, secondary_position)
    (SELECT DISTINCT id_player, ${id_round}, id_sl, \`order\`, primary_position, secondary_position FROM team_player);
  `;

  // 4 - Update round as opened
  const updateRound = `
    UPDATE round SET opened = true WHERE id_round = ${id_round};
  `;

  return Conn.transaction(t => {
    return Conn.query(createPlayerPerformance, {transaction: t})
      .then(() => Conn.query(createTeamPerformance, {transaction: t}))
      .then(() => Conn.query(createPlayerTeamPerformance, {transaction: t}))
      .then(() => Conn.query(updateRound, {transaction: t}))
      .then(results => results[0].affectedRows === 1);
  });
}

function closeRound(root, {id_round}) {
  // 0 - Is the round already closed?
  const round = Round.findOne({where: {id_round}});

  // 1 - Get team performances
  const teams = TeamPerformance.findAll({where: {id_round}})
    .then(teams => teams.reduce((map, team) => {map[team.id_sl] = team; return map;}), {});

  // 2 - Get regular season games
  const games = Game.findAll({where: {id_round, id_type: GameType.parseValue('LEAGUE')}});

  return Promise.all([teams, games, round])
  .then(results => {
    const teamMap = results[0];
    const games = results[1];
    const round = results[2];

    if (round.processed) {
      return false;
    }

    return Conn.transaction(t => {
      const gameUpdates = games.map(game => {
        const home = teamMap[game.home_team];
        const away = teamMap[game.away_team];

        if (home && away) {
          // 3 - Compare scores (consider +-3)
          const homeScore = home.fantasy_points + 3;
          const awayScore = away.fantasy_points - 3;

          let homeQuery;
          let awayQuery;
          // 4 - Update teams reocrds
          if (homeScore > awayScore) {
            homeQuery = TeamSeason.update({win: Sequelize.literal('win + 1') }, {where: {id_sl: home.id_sl}, transaction: t});
            awayQuery = TeamSeason.update({loss: Sequelize.literal('loss + 1') }, {where: {id_sl: away.id_sl}, transaction: t});
          } else {
            awayQuery = TeamSeason.update({win: Sequelize.literal('win + 1') }, {where: {id_sl: away.id_sl}, transaction: t});
            homeQuery = TeamSeason.update({loss: Sequelize.literal('loss + 1') }, {where: {id_sl: home.id_sl}, transaction: t});
          }
          return Promise.all[homeQuery, awayQuery]
        }
      });

      // 5 - Update round as processed
      return Promise.all([].concat(...gameUpdates))
        .then(() => Round.update({processed: true}, {where: {id_round}, transaction: t}) )
        .then((results) => results[0] === 1);
    });
  });
}

export const RoundMutation = {
  openRound: {
    description: 'Open a fantasy round',
    type: GraphQLBoolean,
    args: {
      id_round: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: openRound,
  },
  closeRound: {
    description: 'Close a fantasy round',
    type: GraphQLBoolean,
    args: {
      id_round: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: closeRound,
  },
};
