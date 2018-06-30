'use strict';

import League from '../../../model/league';
import { Conference, TeamSl, Division, Season, User, UserTeam, TeamStats } from '../../../model/setup';
import TeamSeason from '../../../model/associations/team-season';

import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const ManualLeagueTeamStats = new GraphQLObjectType({
  name: 'ManualLeagueTeamStats',
  fields: () => ({
    fantasy_points: { type: GraphQLFloat },
  }),
});

const ManualLeagueTeamUser = new GraphQLObjectType({
  name: 'ManualLeagueTeamUser',
  fields: () => ({
    id_user: { type: GraphQLInt },
    nickname: { type: GraphQLString },
  }),
});

const ManualLeagueTeamRecord = new GraphQLObjectType({
  name: 'ManualLeagueTeamRecord',
  fields: () => ({
    id_season: { type: GraphQLInt },
    win: { type: GraphQLInt },
    loss: { type: GraphQLInt },
  }),
});

const ManualLeagueTeam = new GraphQLObjectType({
  name: 'ManualLeagueTeam',
  fields: () => ({
    id_sl: { type: GraphQLInt },
    slug: { type: GraphQLString },
    city: { type: GraphQLString },
    nickname: { type: GraphQLString },
    symbol: { type: GraphQLString },
    record: { type: ManualLeagueTeamRecord, resolve: team => team.team_season },
    users: { type: new GraphQLList(ManualLeagueTeamUser), resolve: team => team.user_teams.map(ut => ut.user)},
    stats: { type: ManualLeagueTeamStats, resolve: team => team.team_stats[0] },
  }),
})

const ManualLeagueDivision = new GraphQLObjectType({
  name: 'ManualLeagueDivision',
  fields: () => ({
    id_division: { type: GraphQLInt },
    name: { type: GraphQLString },
    symbol: { type: GraphQLString },
    teams: { type: new GraphQLList(ManualLeagueTeam), resolve: division => division.teams },
  }),
});

const ManualLeagueConference = new GraphQLObjectType({
  name: 'ManualLeagueConference',
  fields: () => ({
    id_conference: { type: GraphQLInt },
    name: { type: GraphQLString },
    symbol: { type: GraphQLString },
    divisions: { type: new GraphQLList(ManualLeagueDivision), resolve: conference => conference.divisions },
  }),
});

const ManualLeagueOverview = new GraphQLObjectType({
  name: 'ManualLeagueOverview',
  fields: () => ({
    id_league: { type: GraphQLInt },
    name: { type: GraphQLString },
    symbol: { type: GraphQLString },
    conferences: { type: new GraphQLList(ManualLeagueConference), resolve: league => league.conferences },
  }),
});

// Queries -----------------------------------------------------------------------------------------

const LeagueOverview = (root, args) => {

  return TeamSl.findAll({
    include: [
      {
        model: Division,
        include: [{
          model: Conference,
          include: [{
            model: League,
            where: {
              id_league: args.id_league,
            },
          }]
        }]
      },
      { model: TeamSeason, include: [{ model: Season, where: { current: true } }] },
      { model: UserTeam, include: [{ model: User }] },
      { model: TeamStats, required: false, include: [{model: Season, where: { current: true }, required: false }], },
    ]
  }).then(teams => {

    const divisionMap = new Map();
    teams.forEach(team => {
      const division = divisionMap.get(team.id_division);

      if (!division) {
        divisionMap.set(team.id_division, {
          id_division: team.division.id_division,
          name: team.division.name,
          symbol: team.division.symbol,
          id_conference: team.division.id_conference,
          teams: [team],
        });
      } else {
        division.teams.push(team);
      }
    });

    const conferenceMap = new Map();
    divisionMap.forEach(division => {
      const conference = conferenceMap.get(division.id_conference);

      if (!conference) {
        const randomTeam = division.teams[0];
        conferenceMap.set(division.id_conference, {
          id_conference: randomTeam.division.conference.id_conference,
          name: randomTeam.division.conference.name,
          symbol: randomTeam.division.conference.symbol,
          divisions: [division],
        });
      } else {
        conference.divisions.push(division);
      }
    });

    const randomTeam = teams[0];
    const league = {
      id_league: randomTeam.division.conference.league.id_league,
      name: randomTeam.division.conference.league.name,
      symbol: randomTeam.division.conference.league.symbol,
      conferences: conferenceMap.values(),
    }
    return league;
  });

};

// Export query ------------------------------------------------------------------------------------

export const ManualLeagueOverviewQuery = {
  type: ManualLeagueOverview,
  args: {
    id_league: { name: 'id_league', type: GraphQLInt },
  },
  resolve: LeagueOverview,
};
