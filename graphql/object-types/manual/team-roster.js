'use strict';

import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { TeamPlayer, Player, PlayerStats, Season, Pick } from '../../../model/setup';
import Draft from '../../../model/draft';
import TeamSl from '../../../model/team-sl';

const ManualTeamRosterTeamInfo = new GraphQLObjectType({
  name: 'ManualTeamRosterTeamInfo',
  fields: () => ({
    primary_position: { type: GraphQLString },
    secondary_position: { type: GraphQLString },
    order: { type: GraphQLInt },
  }),
});

const ManualTeamRosterPlayerStat = new GraphQLObjectType({
  name: 'ManualTeamRosterPlayerStat',
  fields: () => ({
    minutes: { type: GraphQLFloat },
    fantasy_points: { type: GraphQLFloat },
  }),
});

const ManualTeamRosterPlayer = new GraphQLObjectType({
  name: 'ManualTeamRosterPlayer',
  fields: () => ({
    id_player: { type: GraphQLInt },
    player_slug: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    contract_years: { type: GraphQLInt },
    contract_salary: { type: GraphQLString },
    birthdate: { type: GraphQLString },
    team_info: { type: ManualTeamRosterTeamInfo, resolve: player => player.team_players[0] },
    stats: { type: ManualTeamRosterPlayerStat, resolve: player => player.player_stats[0] },
  }),
});

const ManualTeamRosterPickDraft = new GraphQLObjectType({
  name: 'ManualTeamRosterPickDraft',
  fields: () => ({
    year_draft: { type: GraphQLInt },
  }),
});

const ManualTeamRosterPickTeam = new GraphQLObjectType({
  name: 'ManualTeamRosterPickTeam',
  fields: () => ({
    id_sl: { type: GraphQLInt },
    slug: { type: GraphQLString },
    city: { type: GraphQLString },
    nickname: { type: GraphQLString },
    symbol: { type: GraphQLString },
  }),
});

const ManualTeamRosterPicks = new GraphQLObjectType({
  name: 'ManualTeamRosterPicks',
  fields: () => ({
    id_pick: { type: GraphQLInt },
    round: { type: GraphQLInt },
    draft: { type: ManualTeamRosterPickDraft },
    original: { type: ManualTeamRosterPickTeam },
  }),
});

const ManualTeamRoster = new GraphQLObjectType({
  name: 'ManualTeamRoster',
  fields: () => ({
    id_sl: { type: GraphQLInt, resolve: result => result.team.id_sl },
    city: { type: GraphQLString, resolve: result => result.team.city },
    nickname: { type: GraphQLString, resolve: result => result.team.nickname },
    slug: { type: GraphQLString, resolve: result => result.team.slug },
    players: { type: new GraphQLList(ManualTeamRosterPlayer) },
    picks: { type: new GraphQLList(ManualTeamRosterPicks) },
  }),
});

// Export query ------------------------------------------------------------------------------------

const TeamRoster = (root, args) => {

  const players = Player.findAll({
    include: [
      { model: TeamPlayer, where: { id_sl: args.id_sl } },
      { model: PlayerStats, required: false, include: [{ model: Season, where: { current: true }, required: false }] },
    ],
  });

  const picks = Pick.findAll({
    include: [{ model: Draft }, Pick.Original],
    where: { id_owner: args.id_sl, is_used: false },
  });

  const team = TeamSl.findOne({
    where: { id_sl: args.id_sl },
  });

  return Promise.all([players, picks, team])
    .then(results => ({players: results[0], picks: results[1], team: results[2] }));

};

// Export query ------------------------------------------------------------------------------------

export const ManualTeamRosterQuery = {
  type: ManualTeamRoster,
  args: {
    id_sl: { name: 'id_sl', type: GraphQLInt },
  },
  resolve: TeamRoster,
};
