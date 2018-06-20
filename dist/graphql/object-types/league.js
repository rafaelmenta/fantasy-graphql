'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _teamSl = require('./team-sl');

var _teamSl2 = _interopRequireDefault(_teamSl);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _conference = require('./conference');

var _conference2 = _interopRequireDefault(_conference);

var _leagueConfig = require('./league-config');

var _leagueConfig2 = _interopRequireDefault(_leagueConfig);

var _freeAgencyHistory = require('./free-agency-history');

var _freeAgencyHistory2 = _interopRequireDefault(_freeAgencyHistory);

var _setup = require('../../model/setup');

var _player = require('./player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLNonNull = graphql.GraphQLNonNull,
    GraphQLList = graphql.GraphQLList;


var LeagueType = new GraphQLObjectType({
  name: 'League',
  fields: function fields() {
    return {
      id_league: {
        type: GraphQLInt
      },
      name: {
        type: GraphQLString
      },
      symbol: {
        type: GraphQLString
      },
      number_of_teams: {
        type: GraphQLInt
      },
      owner: {
        type: _user2.default,
        resolve: resolver(_setup.League.Owner)
      },
      conferences: {
        type: new GraphQLList(_conference2.default),
        resolve: resolver(_setup.League.Conferences)
      },
      teams: {
        type: new GraphQLList(_teamSl2.default),
        resolve: _setup.League.Teams
      },
      configs: {
        type: new GraphQLList(_leagueConfig2.default),
        resolve: resolver(_setup.League.Configs)
      },
      free_agency_history: {
        type: new GraphQLList(_freeAgencyHistory2.default),
        resolve: _setup.FreeAgencyHistory.ByLeague
      },
      free_agents: {
        type: new GraphQLList(_player2.default),
        resolve: _setup.League.FreeAgents
      }
    };
  }
});

exports.default = LeagueType;