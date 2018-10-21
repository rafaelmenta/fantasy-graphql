'use strict';

import {GraphQLInt, GraphQLNonNull, GraphQLBoolean} from 'graphql'
import Conn from '../../../database/connection';

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

export const RoundMutation = {
  openRound: {
    description: 'Open a fantasy round',
    type: GraphQLBoolean,
    args: {
      id_round: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: openRound,
  },
};