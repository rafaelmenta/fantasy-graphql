'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManualTeamRosterQuery = undefined;

var _graphql = require('graphql');

var _setup = require('../../../model/setup');

var _draft = require('../../../model/draft');

var _draft2 = _interopRequireDefault(_draft);

var _teamSl = require('../../../model/team-sl');

var _teamSl2 = _interopRequireDefault(_teamSl);

var _playerLeagueSalary = require('../../../model/player-league-salary');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ManualTeamRosterTeamInfo = new _graphql.GraphQLObjectType({
  name: 'ManualTeamRosterTeamInfo',
  fields: function fields() {
    return {
      primary_position: { type: _graphql.GraphQLString },
      secondary_position: { type: _graphql.GraphQLString },
      order: { type: _graphql.GraphQLInt }
    };
  }
});

var ManualTeamRosterPlayerStat = new _graphql.GraphQLObjectType({
  name: 'ManualTeamRosterPlayerStat',
  fields: function fields() {
    return {
      minutes: { type: _graphql.GraphQLFloat },
      fantasy_points: { type: _graphql.GraphQLFloat }
    };
  }
});

var ManualRosterPlayerSalary = new _graphql.GraphQLObjectType({
  name: 'ManualRosterPlayerSalary',
  fields: function fields() {
    return {
      contract_salary: { type: _graphql.GraphQLFloat, resolve: function resolve(salaries) {
          return salaries.length > 0 && salaries[0].contract_salary;
        } },
      contract_years: { type: _graphql.GraphQLInt, resolve: function resolve(salaries) {
          return salaries.length > 0 && salaries[0].contract_years;
        } }
    };
  }
});

var ManualTeamRosterPlayer = new _graphql.GraphQLObjectType({
  name: 'ManualTeamRosterPlayer',
  fields: function fields() {
    return {
      id_player: { type: _graphql.GraphQLInt },
      player_slug: { type: _graphql.GraphQLString },
      first_name: { type: _graphql.GraphQLString },
      last_name: { type: _graphql.GraphQLString },
      contract_years: { type: _graphql.GraphQLInt },
      contract_salary: { type: _graphql.GraphQLString },
      birthdate: { type: _graphql.GraphQLString },
      team_info: { type: ManualTeamRosterTeamInfo, resolve: function resolve(player) {
          return player.team_players[0];
        } },
      salary: { type: ManualRosterPlayerSalary, resolve: _playerLeagueSalary.PlayerLeagueSalary.TeamPlayerSalary },
      stats: { type: ManualTeamRosterPlayerStat, resolve: function resolve(player) {
          return player.player_stats[0];
        } }
    };
  }
});

var ManualTeamRosterPickDraft = new _graphql.GraphQLObjectType({
  name: 'ManualTeamRosterPickDraft',
  fields: function fields() {
    return {
      year_draft: { type: _graphql.GraphQLInt }
    };
  }
});

var ManualTeamRosterPickTeam = new _graphql.GraphQLObjectType({
  name: 'ManualTeamRosterPickTeam',
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

var ManualTeamRosterPicks = new _graphql.GraphQLObjectType({
  name: 'ManualTeamRosterPicks',
  fields: function fields() {
    return {
      id_pick: { type: _graphql.GraphQLInt },
      round: { type: _graphql.GraphQLInt },
      draft: { type: ManualTeamRosterPickDraft },
      original: { type: ManualTeamRosterPickTeam }
    };
  }
});

var ManualTeamRoster = new _graphql.GraphQLObjectType({
  name: 'ManualTeamRoster',
  fields: function fields() {
    return {
      id_sl: { type: _graphql.GraphQLInt, resolve: function resolve(result) {
          return result.team.id_sl;
        } },
      city: { type: _graphql.GraphQLString, resolve: function resolve(result) {
          return result.team.city;
        } },
      nickname: { type: _graphql.GraphQLString, resolve: function resolve(result) {
          return result.team.nickname;
        } },
      slug: { type: _graphql.GraphQLString, resolve: function resolve(result) {
          return result.team.slug;
        } },
      players: { type: new _graphql.GraphQLList(ManualTeamRosterPlayer) },
      picks: { type: new _graphql.GraphQLList(ManualTeamRosterPicks) }
    };
  }
});

// Export query ------------------------------------------------------------------------------------

var TeamRoster = function TeamRoster(root, args) {

  var players = _setup.Player.findAll({
    include: [{ model: _setup.TeamPlayer, where: { id_sl: args.id_sl } }, { model: _setup.PlayerStats, required: false, include: [{ model: _setup.Season, where: { current: true }, required: false }] }]
  });

  var picks = _setup.Pick.findAll({
    include: [{ model: _draft2.default }, _setup.Pick.Original],
    where: { id_owner: args.id_sl, is_used: false }
  });

  var team = _teamSl2.default.findOne({
    where: { id_sl: args.id_sl }
  });

  return Promise.all([players, picks, team]).then(function (results) {
    return { players: results[0], picks: results[1], team: results[2] };
  });
};

// Export query ------------------------------------------------------------------------------------

var ManualTeamRosterQuery = exports.ManualTeamRosterQuery = {
  type: ManualTeamRoster,
  args: {
    id_sl: { name: 'id_sl', type: _graphql.GraphQLInt }
  },
  resolve: TeamRoster
};