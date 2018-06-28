'use strict';

import PlayerType from "../../object-types/player";
import Draft from "../../../model/draft";
import { TeamPlayer, Division, Conference, Pick, Player } from "../../../model/setup";
import TeamSl from "../../../model/team-sl";
import DraftStatus from "../../object-types/enum/draft-status";
import Conn from "../../../database/connection";

const graphql = require('graphql');

const {
  GraphQLNonNull,
  GraphQLInt,
} = graphql;

export const DraftMutation = {
  draftPlayer: {
    description: 'Returns drafted player',
    type: PlayerType,
    args: {
      id_draft: { type: new GraphQLNonNull(GraphQLInt) },
      id_pick: { type: new GraphQLNonNull(GraphQLInt) },
      id_league: { type: new GraphQLNonNull(GraphQLInt) },
      id_sl: { type: new GraphQLNonNull(GraphQLInt) },
      id_player: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: (root, {id_draft, id_league, id_pick, id_sl, id_player}) => {
      const draft = Draft.findOne({ where: { id_draft }});
      const player = Player.findOne({ where: { id_player } });
      const unusedPicks = Pick.findAll({
        where: {
          id_draft,
          is_used: false,
          deadline : {
            $gte: new Date(),
          },
        },
      });
      const teamPlayer = TeamPlayer.findOne({
        where: {id_player},
        include: [{
          model: TeamSl,
          foreignKey: 'id_sl',
          include: [{
            model: Division,
            foreignKey: 'id_division',
            include: [{
              model: Conference,
              foreignKey: 'id_conference',
              where: { id_league },
            }],
          }],
        }],
      });

      return Promise.all([draft, teamPlayer, unusedPicks, player]).then(results => {
        const draft = results[0];
        const teamPlayer = results[1];
        const unusedPicks = results[2];
        const player = results[3];

        if (draft.status_draft !== DraftStatus.parseValue('STATUS_OPEN')) {
          return null;
        }

        if (teamPlayer) {
          return null;
        }

        if (!unusedPicks || unusedPicks.length === 0) {
          return null;
        }

        const picks = unusedPicks.sort(orderPicks);
        const currentPick = picks[0];

        if (currentPick.id_pick !== id_pick) {
          return null;
        }

        if (currentPick.id_owner !== id_sl) {
          return null;
        }

        if (!player) {
          return null;
        }

        return Conn.transaction(transaction => {
          const updatePick = Pick.update({
            id_player,
            is_used: true,
          }, {
            where: { id_pick },
            transaction,
          });

          const recruitPlayer = TeamPlayer.create({
            id_sl,
            id_player,
            primary_position: player.default_primary,
            secondary_position: player.default_secondary
          }, { transaction });

          return Promise.all([updatePick, recruitPlayer]).then(() => player);
        });
      });
    },
  }
}

function orderPicks(a, b) {
  if (a.round < b.round || (a.round === b.round && a.order < b.order)) {
    return -1;
  }

  if (a.round === b.round && a.order === b.order) {
    return 0;
  }

  return 1;
}