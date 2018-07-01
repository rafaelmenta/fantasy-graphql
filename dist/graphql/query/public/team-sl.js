'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _teamSl = require('../../object-types/team-sl');

var _teamSl2 = _interopRequireDefault(_teamSl);

var _setup = require('../../../model/setup');

var _teamOverview = require('../../object-types/manual/team-overview');

var _teamRoster = require('../../object-types/manual/team-roster');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLString = graphql.GraphQLString,
    GraphQLNonNull = graphql.GraphQLNonNull;


var TeamSLQuery = {
  team: {
    type: _teamSl2.default,
    resolve: resolver(_setup.TeamSl),
    args: {
      id_sl: {
        name: 'id_sl',
        type: GraphQLInt
      },
      slug: {
        name: 'slug',
        type: GraphQLString
      }
    }
  },
  teams: {
    type: new GraphQLList(_teamSl2.default),
    resolve: resolver(_setup.TeamSl),
    args: {
      id_sl: {
        name: 'id_sl',
        type: new GraphQLList(GraphQLInt)
      }
    }
  },
  team_overview: _teamOverview.ManualTeamOverviewQuery,
  team_roster: _teamRoster.ManualTeamRosterQuery
};

exports.default = TeamSLQuery;