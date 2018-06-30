'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManualLeagueOverviewQuery = undefined;

var _league = require('../../../model/league');

var _league2 = _interopRequireDefault(_league);

var _setup = require('../../../model/setup');

var _teamSeason = require('../../../model/associations/team-season');

var _teamSeason2 = _interopRequireDefault(_teamSeason);

var _graphql = require('graphql');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ManualLeagueTeamStats = new _graphql.GraphQLObjectType({
  name: 'ManualLeagueTeamStats',
  fields: function fields() {
    return {
      fantasy_points: { type: _graphql.GraphQLFloat }
    };
  }
});

var ManualLeagueTeamUser = new _graphql.GraphQLObjectType({
  name: 'ManualLeagueTeamUser',
  fields: function fields() {
    return {
      id_user: { type: _graphql.GraphQLInt },
      nickname: { type: _graphql.GraphQLString }
    };
  }
});

var ManualLeagueTeamRecord = new _graphql.GraphQLObjectType({
  name: 'ManualLeagueTeamRecord',
  fields: function fields() {
    return {
      id_season: { type: _graphql.GraphQLInt },
      win: { type: _graphql.GraphQLInt },
      loss: { type: _graphql.GraphQLInt }
    };
  }
});

var ManualLeagueTeam = new _graphql.GraphQLObjectType({
  name: 'ManualLeagueTeam',
  fields: function fields() {
    return {
      id_sl: { type: _graphql.GraphQLInt },
      slug: { type: _graphql.GraphQLString },
      city: { type: _graphql.GraphQLString },
      nickname: { type: _graphql.GraphQLString },
      symbol: { type: _graphql.GraphQLString },
      record: { type: ManualLeagueTeamRecord, resolve: function resolve(team) {
          return team.team_season;
        } },
      users: { type: new _graphql.GraphQLList(ManualLeagueTeamUser), resolve: function resolve(team) {
          return team.user_teams.map(function (ut) {
            return ut.user;
          });
        } },
      stats: { type: ManualLeagueTeamStats, resolve: function resolve(team) {
          return team.team_stats[0];
        } }
    };
  }
});

var ManualLeagueDivision = new _graphql.GraphQLObjectType({
  name: 'ManualLeagueDivision',
  fields: function fields() {
    return {
      id_division: { type: _graphql.GraphQLInt },
      name: { type: _graphql.GraphQLString },
      symbol: { type: _graphql.GraphQLString },
      teams: { type: new _graphql.GraphQLList(ManualLeagueTeam), resolve: function resolve(division) {
          return division.teams;
        } }
    };
  }
});

var ManualLeagueConference = new _graphql.GraphQLObjectType({
  name: 'ManualLeagueConference',
  fields: function fields() {
    return {
      id_conference: { type: _graphql.GraphQLInt },
      name: { type: _graphql.GraphQLString },
      symbol: { type: _graphql.GraphQLString },
      divisions: { type: new _graphql.GraphQLList(ManualLeagueDivision), resolve: function resolve(conference) {
          return conference.divisions;
        } }
    };
  }
});

var ManualLeagueOverview = new _graphql.GraphQLObjectType({
  name: 'ManualLeagueOverview',
  fields: function fields() {
    return {
      id_league: { type: _graphql.GraphQLInt },
      name: { type: _graphql.GraphQLString },
      symbol: { type: _graphql.GraphQLString },
      conferences: { type: new _graphql.GraphQLList(ManualLeagueConference), resolve: function resolve(league) {
          return league.conferences;
        } }
    };
  }
});

// Queries -----------------------------------------------------------------------------------------

var LeagueOverview = function LeagueOverview(root, args) {

  return _setup.TeamSl.findAll({
    include: [{
      model: _setup.Division,
      include: [{
        model: _setup.Conference,
        include: [{
          model: _league2.default,
          where: {
            id_league: args.id_league
          }
        }]
      }]
    }, { model: _teamSeason2.default, include: [{ model: _setup.Season, where: { current: true } }] }, { model: _setup.UserTeam, include: [{ model: _setup.User }] }, { model: _setup.TeamStats, include: [{ model: _setup.Season, where: { current: true } }] }]
  }).then(function (teams) {

    var divisionMap = new Map();
    teams.forEach(function (team) {
      var division = divisionMap.get(team.id_division);

      if (!division) {
        divisionMap.set(team.id_division, {
          id_division: team.division.id_division,
          name: team.division.name,
          symbol: team.division.symbol,
          id_conference: team.division.id_conference,
          teams: [team]
        });
      } else {
        division.teams.push(team);
      }
    });

    var conferenceMap = new Map();
    divisionMap.forEach(function (division) {
      var conference = conferenceMap.get(division.id_conference);

      if (!conference) {
        var _randomTeam = division.teams[0];
        conferenceMap.set(division.id_conference, {
          id_conference: _randomTeam.division.conference.id_conference,
          name: _randomTeam.division.conference.name,
          symbol: _randomTeam.division.conference.symbol,
          divisions: [division]
        });
      } else {
        conference.divisions.push(division);
      }
    });

    var randomTeam = teams[0];
    var league = {
      id_league: randomTeam.division.conference.league.id_league,
      name: randomTeam.division.conference.league.name,
      symbol: randomTeam.division.conference.league.symbol,
      conferences: conferenceMap.values()
    };
    return league;
  });
};

// Export query ------------------------------------------------------------------------------------

var ManualLeagueOverviewQuery = exports.ManualLeagueOverviewQuery = {
  type: ManualLeagueOverview,
  args: {
    id_league: { name: 'id_league', type: _graphql.GraphQLInt }
  },
  resolve: LeagueOverview
};