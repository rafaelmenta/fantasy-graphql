'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManualTeamOverviewQuery = undefined;

var _setup = require('../../../model/setup');

var _graphql = require('graphql');

var _conference = require('../../../model/conference');

var _conference2 = _interopRequireDefault(_conference);

var _teamSeason = require('../../../model/associations/team-season');

var _teamSeason2 = _interopRequireDefault(_teamSeason);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var teamMap = {};
var teamPerfomanceMap = {};

var ManualTeamLeague = new _graphql.GraphQLObjectType({
  name: 'ManualTeamLeague',
  fields: function fields() {
    return {
      id_league: { type: _graphql.GraphQLInt },
      name: { type: _graphql.GraphQLString }
    };
  }
});

var ManualTeamConference = new _graphql.GraphQLObjectType({
  name: 'ManualTeamConference',
  fields: function fields() {
    return {
      id_conference: { type: _graphql.GraphQLInt },
      name: { type: _graphql.GraphQLString },
      league: { type: ManualTeamLeague }
    };
  }
});

var ManualTeamDivision = new _graphql.GraphQLObjectType({
  name: 'ManualTeamDivision',
  fields: function fields() {
    return {
      id_division: { type: _graphql.GraphQLInt },
      name: { type: _graphql.GraphQLString },
      conference: { type: ManualTeamConference }
    };
  }
});

var ManualTeamUser = new _graphql.GraphQLObjectType({
  name: 'ManualTeamUser',
  fields: function fields() {
    return {
      id_user: { type: _graphql.GraphQLInt },
      nickname: { type: _graphql.GraphQLString }
    };
  }
});

var ManualTeamInfo = new _graphql.GraphQLObjectType({
  name: 'ManualTeamInfo',
  fields: function fields() {
    return {
      primary_position: { type: _graphql.GraphQLString },
      secondary_position: { type: _graphql.GraphQLString },
      order: { type: _graphql.GraphQLInt }
    };
  }
});

var ManualTeamPlayerStat = new _graphql.GraphQLObjectType({
  name: 'ManualTeamPlayerStat',
  fields: function fields() {
    return {
      minutes: { type: _graphql.GraphQLFloat },
      fantasy_points: { type: _graphql.GraphQLFloat }
    };
  }
});

var ManualTeamPlayer = new _graphql.GraphQLObjectType({
  name: 'ManualTeamPlayer',
  fields: function fields() {
    return {
      id_player: { type: _graphql.GraphQLInt },
      first_name: { type: _graphql.GraphQLString },
      last_name: { type: _graphql.GraphQLString },
      player_slug: { type: _graphql.GraphQLString },
      team_info: { type: ManualTeamInfo, resolve: function resolve(player) {
          return player.team_players[0];
        } },
      stats: { type: new _graphql.GraphQLList(ManualTeamPlayerStat), resolve: function resolve(player) {
          return player.player_stats;
        } }
    };
  }
});

var ManualTeamRecord = new _graphql.GraphQLObjectType({
  name: 'ManualTeamRecord',
  fields: function fields() {
    return {
      id_season: { type: _graphql.GraphQLInt },
      win: { type: _graphql.GraphQLInt },
      loss: { type: _graphql.GraphQLInt }
    };
  }
});

var ManualTeamStats = new _graphql.GraphQLObjectType({
  name: 'ManualTeamStats',
  fields: function fields() {
    return {
      minutes_pg: { type: _graphql.GraphQLFloat },
      minutes_sg: { type: _graphql.GraphQLFloat },
      minutes_sf: { type: _graphql.GraphQLFloat },
      minutes_pf: { type: _graphql.GraphQLFloat },
      minutes_c: { type: _graphql.GraphQLFloat },
      fantasy_points: { type: _graphql.GraphQLFloat }
    };
  }
});

var ManualTeamDraft = new _graphql.GraphQLObjectType({
  name: 'ManualTeamDraft',
  fields: function fields() {
    return {
      year_draft: { type: _graphql.GraphQLInt }
    };
  }
});

var ManualTeamLookup = new _graphql.GraphQLObjectType({
  name: 'ManualTeamLookup',
  fields: function fields() {
    return {
      id_sl: { type: _graphql.GraphQLInt },
      slug: { type: _graphql.GraphQLString },
      city: { type: _graphql.GraphQLString },
      nickname: { type: _graphql.GraphQLString },
      symbol: { type: _graphql.GraphQLString }
    };
  }
});

var ManualTeamPick = new _graphql.GraphQLObjectType({
  name: 'ManualTeamPick',
  fields: function fields() {
    return {
      id_pick: { type: _graphql.GraphQLInt },
      is_used: { type: _graphql.GraphQLBoolean },
      round: { type: _graphql.GraphQLInt },
      draft: { type: ManualTeamDraft, resolve: function resolve(pick) {
          return _setup.Draft.findOne({ where: { id_draft: pick.id_draft } });
        } },
      original: { type: ManualTeamLookup, resolve: function resolve(pick) {
          return teamMap[pick.id_sl_original];
        } }
    };
  }
});

var ManualTeamRound = new _graphql.GraphQLObjectType({
  name: 'ManualTeamRound',
  fields: function fields() {
    return {
      round_number: { type: _graphql.GraphQLInt }
    };
  }
});

var ManualTeamPerformance = new _graphql.GraphQLObjectType({
  name: 'ManualTeamPerformance',
  fields: function fields() {
    return {
      fantasy_points: { type: _graphql.GraphQLFloat }
    };
  }
});

var ManualTeamGame = new _graphql.GraphQLObjectType({
  name: 'ManualTeamGame',
  fields: function fields() {
    return {
      id_game: { type: _graphql.GraphQLInt },
      round: { type: ManualTeamRound },
      home_team: { type: ManualTeamLookup, resolve: function resolve(game) {
          return teamMap[game.home_team];
        } },
      away_team: { type: ManualTeamLookup, resolve: function resolve(game) {
          return teamMap[game.away_team];
        } },
      home_performance: { type: ManualTeamPerformance, resolve: function resolve(game) {
          return game.home_performance;
        } },
      away_performance: { type: ManualTeamPerformance, resolve: function resolve(game) {
          return game.away_performance;
        } }
    };
  }
});

var ManualTeamOverview = new _graphql.GraphQLObjectType({
  name: 'ManualTeamOverview',
  fields: function fields() {
    return {
      id_sl: { type: _graphql.GraphQLInt },
      city: { type: _graphql.GraphQLString },
      nickname: { type: _graphql.GraphQLString },
      symbol: { type: _graphql.GraphQLString },
      primary_color: { type: _graphql.GraphQLString },
      secondary_color: { type: _graphql.GraphQLString },
      slug: { type: _graphql.GraphQLString },
      division: { type: ManualTeamDivision },
      users: { type: new _graphql.GraphQLList(ManualTeamUser), resolve: function resolve(team) {
          return team.users;
        } },
      players: { type: new _graphql.GraphQLList(ManualTeamPlayer), resolve: function resolve(team) {
          return team.players;
        } },
      record: { type: ManualTeamRecord, resolve: function resolve(team) {
          return team.team_season;
        } },
      stats: { type: ManualTeamStats, resolve: function resolve(team) {
          return team.stats;
        } },
      picks: { type: new _graphql.GraphQLList(ManualTeamPick), resolve: function resolve(team) {
          return team.picks;
        } },
      recent_games: { type: new _graphql.GraphQLList(ManualTeamGame), resolve: function resolve(team) {
          return team.recent_games;
        } },
      next_games: { type: new _graphql.GraphQLList(ManualTeamGame), resolve: _setup.TeamSl.NextGames }
    };
  }
});

// Queries -----------------------------------------------------------------------------------------

var ManualTeamOverviewResolve = function ManualTeamOverviewResolve(root, args) {
  if (args.id_sl) {
    return ManualTeamOverviewById(args);
  }
  return _setup.TeamSl.findOne({
    include: [{ model: _setup.Division, include: [{ model: _conference2.default, include: [{ model: _setup.League }] }] }, { model: _teamSeason2.default, include: [{ model: _setup.Season, where: { current: true } }] }],
    where: { slug: args.slug }
  }).then(function (team) {
    return ManualTeamOverviewById({ team: team });
  });
};

var ManualTeamOverviewById = function ManualTeamOverviewById(args) {
  var team = args.team;
  if (team) {
    args.id_sl = team.id_sl;
  }

  var teamQuery = team || _setup.TeamSl.findOne({
    include: [{ model: _setup.Division, include: [{ model: _conference2.default, include: [{ model: _setup.League }] }] }, { model: _teamSeason2.default, include: [{ model: _setup.Season, where: { current: true } }] }],
    where: { id_sl: args.id_sl }
  });

  var playersQuery = _setup.Player.findAll({
    include: [{ model: _setup.TeamPlayer, where: { id_sl: args.id_sl } }, { model: _setup.PlayerStats, include: [{ model: _setup.Season, where: { current: true }, required: false }] }]
  });

  var usersQuery = _setup.User.findAll({
    include: [{ model: _setup.UserTeam, where: { id_sl: args.id_sl } }]
  });

  var picksQuery = _setup.Pick.findAll({ where: { id_owner: args.id_sl, is_used: false } });

  var statsQuery = _setup.TeamStats.findOne({
    include: [{ model: _setup.Season, where: { current: true } }],
    where: { id_sl: args.id_sl }
  });

  var recentGamesQuery = _setup.TeamSl.RecentGames({ id_sl: args.id_sl }).then(function (games) {
    var performanceConditions = games.map(function (game) {
      return [{
        $or: [{ id_sl: game.away_team, id_round: game.id_round }, { id_sl: game.home_team, id_round: game.id_round }]
      }];
    });

    var performanceQuery = _setup.TeamPerformance.findAll({
      where: { $or: performanceConditions }
    }).then(function (performances) {
      return performances.forEach(function (performance) {
        teamPerfomanceMap[performance.id_sl + '_' + performance.id_round] = performance;
      });
    });

    return Promise.all([games, performanceQuery]).then(function (results) {
      var games = results[0];
      games.forEach(function (game) {
        game.home_performance = teamPerfomanceMap[game.home_team + '_' + game.id_round];
        game.away_performance = teamPerfomanceMap[game.away_team + '_' + game.id_round];
      });

      return games;
    });
  });

  return Promise.all([teamQuery, playersQuery, usersQuery, picksQuery, statsQuery, recentGamesQuery]).then(function (results) {

    var team = results[0];
    team.players = results[1];
    team.users = results[2];
    team.picks = results[3];
    team.stats = results[4];
    team.recent_games = results[5];

    var teamsQuery = _setup.TeamSl.findAll({
      include: [{
        model: _setup.Division,
        include: [{
          model: _conference2.default,
          include: [{
            model: _setup.League,
            where: { id_league: team.division.conference.league.id_league }
          }]
        }]
      }]
    }).then(function (teams) {
      return teams.forEach(function (team) {
        teamMap[team.id_sl] = team;
      });
    });

    return Promise.all([team, teamsQuery]).then(function (results) {
      return results[0];
    });
  });
};

// Export query ------------------------------------------------------------------------------------

var ManualTeamOverviewQuery = exports.ManualTeamOverviewQuery = {
  type: ManualTeamOverview,
  args: {
    id_sl: { name: 'id_sl', type: _graphql.GraphQLInt },
    slug: { name: 'slug', type: _graphql.GraphQLString }
  },
  resolve: ManualTeamOverviewResolve
};