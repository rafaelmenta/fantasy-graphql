'use strict';

import { TeamSl, Division, League, UserTeam, User, TeamPlayer, Player, PlayerStats, Season, TeamStats, Pick, TeamPerformance, Draft, } from '../../../model/setup';

import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import Conference from '../../../model/conference';
import TeamSeason from '../../../model/associations/team-season';

const teamMap = {};
const teamPerfomanceMap = {};

const ManualTeamLeague = new GraphQLObjectType({
  name: 'ManualTeamLeague',
  fields: () => ({
    id_league: { type: GraphQLInt },
    name: { type: GraphQLString },
  })
});

const ManualTeamConference = new GraphQLObjectType({
  name: 'ManualTeamConference',
  fields: () => ({
    id_conference: { type: GraphQLInt },
    name: { type: GraphQLString },
    league: { type: ManualTeamLeague },
  }),
});

const ManualTeamDivision = new GraphQLObjectType({
  name: 'ManualTeamDivision',
  fields: () => ({
    id_division: { type: GraphQLInt },
    name: { type: GraphQLString },
    conference: { type: ManualTeamConference },
  }),
});

const ManualTeamUser = new GraphQLObjectType({
  name: 'ManualTeamUser',
  fields: () => ({
    id_user: { type: GraphQLInt },
    nickname: { type: GraphQLString },
  }),
});

const ManualTeamInfo = new GraphQLObjectType({
  name: 'ManualTeamInfo',
  fields: () => ({
    primary_position: { type: GraphQLString },
    secondary_position: { type: GraphQLString },
    order: { type: GraphQLInt },
  }),
});

const ManualTeamPlayerStat = new GraphQLObjectType({
  name: 'ManualTeamPlayerStat',
  fields: () => ({
    minutes: { type: GraphQLFloat},
    fantasy_points: { type: GraphQLFloat},
  }),
});

const ManualTeamPlayer = new GraphQLObjectType({
  name: 'ManualTeamPlayer',
  fields: () => ({
    id_player: { type: GraphQLInt },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    player_slug: { type: GraphQLString },
    team_info: { type: ManualTeamInfo, resolve: player => player.team_players[0] },
    stats: { type: new GraphQLList(ManualTeamPlayerStat), resolve: player => player.player_stats },
  }),
});

const ManualTeamRecord = new GraphQLObjectType({
  name: 'ManualTeamRecord',
  fields: () => ({
    id_season: { type: GraphQLInt },
    win: { type: GraphQLInt },
    loss: { type: GraphQLInt },
  }),
});

const ManualTeamStats = new GraphQLObjectType({
  name: 'ManualTeamStats',
  fields: () => ({
    minutes_pg: { type: GraphQLFloat },
    minutes_sg: { type: GraphQLFloat },
    minutes_sf: { type: GraphQLFloat },
    minutes_pf: { type: GraphQLFloat },
    minutes_c: { type: GraphQLFloat },
    fantasy_points: { type: GraphQLFloat },
  }),
});

const ManualTeamDraft = new GraphQLObjectType({
  name: 'ManualTeamDraft',
  fields: () => ({
    year_draft: { type: GraphQLInt },
  }),
});

const ManualTeamLookup = new GraphQLObjectType({
  name: 'ManualTeamLookup',
  fields: () => ({
    id_sl: { type: GraphQLInt },
    slug: { type: GraphQLString },
    city: { type: GraphQLString },
    nickname: { type: GraphQLString },
    symbol: { type: GraphQLString },
  }),
})

const ManualTeamPick = new GraphQLObjectType({
  name: 'ManualTeamPick',
  fields: () => ({
    id_pick: { type: GraphQLInt },
    is_used: { type: GraphQLBoolean },
    round: { type: GraphQLInt },
    draft: { type: ManualTeamDraft, resolve: pick => Draft.findOne({where: {id_draft: pick.id_draft }})},
    original: { type: ManualTeamLookup, resolve: pick => teamMap[pick.id_sl_original] },
  }),
});

const ManualTeamRound = new GraphQLObjectType({
  name: 'ManualTeamRound',
  fields: () => ({
    round_number: { type: GraphQLInt },
  }),
});

const ManualTeamPerformance = new GraphQLObjectType({
  name: 'ManualTeamPerformance',
  fields: () => ({
    fantasy_points: { type: GraphQLFloat },
  }),
});

const ManualTeamGame = new GraphQLObjectType({
  name: 'ManualTeamGame',
  fields: () => ({
    id_game: { type: GraphQLInt },
    round: { type: ManualTeamRound },
    home_team: { type: ManualTeamLookup, resolve: game => teamMap[game.home_team] },
    away_team: { type: ManualTeamLookup, resolve: game => teamMap[game.away_team] },
    home_performance: { type: ManualTeamPerformance, resolve: game => game.home_performance },
    away_performance: { type: ManualTeamPerformance, resolve: game => game.away_performance },
  }),
});

const ManualTeamOverview = new GraphQLObjectType({
  name: 'ManualTeamOverview',
  fields: () => ({
    id_sl: { type: GraphQLInt },
    city: { type: GraphQLString },
    nickname: { type: GraphQLString },
    symbol: { type: GraphQLString },
    primary_color: { type: GraphQLString },
    secondary_color: { type: GraphQLString },
    slug: { type: GraphQLString },
    division: { type: ManualTeamDivision },
    users: { type: new GraphQLList(ManualTeamUser), resolve: team => team.users },
    players: { type: new GraphQLList(ManualTeamPlayer), resolve: team => team.players },
    record: { type: ManualTeamRecord, resolve: team => team.team_season },
    stats: { type: ManualTeamStats, resolve: team => team.stats },
    picks: { type: new GraphQLList(ManualTeamPick), resolve: team => team.picks  },
    recent_games: { type: new GraphQLList(ManualTeamGame), resolve: team => team.recent_games },
    next_games: { type: new GraphQLList(ManualTeamGame), resolve: TeamSl.NextGames },
  }),
});

const ManualTeamOverviewResolve = (root, args) => {
  if (args.id_sl) {
    return ManualTeamOverviewById(args);
  }
  return TeamSl.findOne({
    include: [
      { model: Division, include: [{ model: Conference, include: [{ model: League }] }] },
      { model: TeamSeason, include: [{ model: Season, where: { current: true } }] }
    ],
    where: { slug: args.slug },
  }).then(team => ManualTeamOverviewById({team}) );
};

export const ManualTeamOverviewQuery = {
  type: ManualTeamOverview,
  args: {
    id_sl: {name: 'id_sl', type: GraphQLInt },
    slug: {name: 'slug', type: GraphQLString },
  },
  resolve: ManualTeamOverviewResolve,
};

// Queries -----------------------------------------------------------------------------------------

const ManualTeamOverviewById = args => {
  const team = args.team;
  if (team) {
    args.id_sl = team.id_sl;
  }

  const teamQuery = team || TeamSl.findOne({
    include: [
      { model: Division, include: [{ model: Conference, include: [{ model: League }] }] },
      { model: TeamSeason, include: [{ model: Season, where: { current: true } }] }
    ],
    where: { id_sl: args.id_sl },
  });

  const playersQuery = Player.findAll({
    include: [
      { model: TeamPlayer, where: { id_sl: args.id_sl } },
      { model: PlayerStats, include: [{ model: Season, where: { current: true }, required: false }] },
    ],
  });

  const usersQuery = User.findAll({
    include: [{ model: UserTeam, where: { id_sl: args.id_sl } }],
  });

  const picksQuery = Pick.findAll({ where: { id_owner: args.id_sl, is_used: false } });

  const statsQuery = TeamStats.findOne({
    include: [{ model: Season, where: { current: true } }],
    where: { id_sl: args.id_sl },
  });

  const recentGamesQuery = TeamSl.RecentGames({ id_sl: args.id_sl }).then(games => {
    const performanceConditions = games.map(game => [{
      $or: [
        { id_sl: game.away_team, id_round: game.id_round },
        { id_sl: game.home_team, id_round: game.id_round },
      ],
    }]);

    const performanceQuery = TeamPerformance.findAll({
      where: { $or: performanceConditions },
    }).then(performances => performances.forEach(performance => {
      teamPerfomanceMap[`${performance.id_sl}_${performance.id_round}`] = performance;
    }));

    return Promise.all([games, performanceQuery]).then(results => {
      const games = results[0];
      games.forEach(game => {
        game.home_performance = teamPerfomanceMap[`${game.home_team}_${game.id_round}`];
        game.away_performance = teamPerfomanceMap[`${game.away_team}_${game.id_round}`];
      });

      return games;
    });
  });

  return Promise.all([
    teamQuery,
    playersQuery,
    usersQuery,
    picksQuery,
    statsQuery,
    recentGamesQuery
  ]).then(results => {

    const team = results[0];
    team.players = results[1];
    team.users = results[2];
    team.picks = results[3];
    team.stats = results[4];
    team.recent_games = results[5];

    const teamsQuery = TeamSl.findAll({
      include: [{
        model: Division,
        include: [{
          model: Conference,
          include: [{
            model: League,
            where: { id_league: team.division.conference.league.id_league },
          }],
        }],
      }],
    }).then(teams => teams.forEach(team => {
      teamMap[team.id_sl] = team;
    }));

    return Promise.all([team, teamsQuery]).then(results => results[0]);
  })

};