'use strict';

import PlayerType from "../../object-types/player";
import Draft from "../../../model/draft";
import { TeamPlayer, Division, Conference, Pick, Player } from "../../../model/setup";
import TeamSl from "../../../model/team-sl";
import DraftStatus from "../../object-types/enum/draft-status";
import Conn from "../../../database/connection";
import DraftType from "../../object-types/draft";
import { GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLInputObjectType, GraphQLList } from 'graphql';
import { resolver } from 'graphql-sequelize';
import PickType from "../../object-types/pick";

const DraftInput = new GraphQLInputObjectType({
  name: 'DraftInput',
  fields: () => ({
    id_season: { type: new GraphQLNonNull(GraphQLInt) },
    id_league: { type: new GraphQLNonNull(GraphQLInt) },
    draft_type: { type: new GraphQLNonNull(GraphQLInt) },
    year_draft: { type: new GraphQLNonNull(GraphQLString) },
    status_draft: { type: GraphQLInt, defaultValue: DraftStatus.parseValue('STATUS_CLOSED')},
  }),
});

export const DraftMutation = {
  createDraft: {
    description: 'Create a draft',
    type: DraftType,
    args: {
      draft: {type: DraftInput},
    },
    resolve: (root, { draft }) => Draft.create(draft),
  },
  deleteDraft: {
    description: 'Delete a draft',
    type: GraphQLInt,
    args: {
      id_draft: { type: GraphQLInt },
    },
    resolve: (root, { id_draft }) => Draft.destroy({ where: { id_draft } }),
  },
  updateDraftStatus: {
    description: 'Update draft status',
    type: new GraphQLList(GraphQLInt),
    args: {
      id_draft: { type: GraphQLInt },
      status_draft: { type: GraphQLInt },
    },
    resolve: (root, { id_draft, status_draft }) => Draft.update({status_draft}, {where: {id_draft} }),
  },
  createRound: {
    description: 'Create picks for a Draft',
    type: new GraphQLList(PickType),
    args: {
      id_draft: {type: GraphQLInt},
      id_league: {type: GraphQLInt},
      round: {type: GraphQLInt},
    },
    resolve: (root, {id_draft, id_league, round}) => Conn.transaction(t => {
      return TeamSl.findAll({where: {league_id: id_league}}).then(teams => {
        const creates = teams.map((team, index) => Pick.create({
            id_draft,
            round,
            order: index + 1,
            id_owner: team.id_sl,
            id_sl_original: team.id_sl,
            is_used: false,
          }, {transaction: t}
        ));

        return Promise.all(creates);
      });
    }),
  },
  deleteRound: {
    description: 'Delete picks of a round',
    type: GraphQLInt,
    args: {
      id_draft: {type: new GraphQLNonNull(GraphQLInt)},
      round: {type: new GraphQLNonNull(GraphQLInt)},
    },
    resolve: (root, {id_draft, round}) => Pick.destroy({where: {id_draft, round}}),
  },
  savePick: {
    description: 'Update a pick',
    type: new GraphQLList(GraphQLInt),
    args: {
      id_pick: {type: GraphQLInt},
      id_owner: {type: GraphQLInt},
      deadline: {type: GraphQLString},
      order: {type: GraphQLInt},
    },
    resolve: (root, {id_pick, id_owner, deadline, order}) =>
      Pick.update({id_owner, deadline, order}, {where: {id_pick}}),
  },
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