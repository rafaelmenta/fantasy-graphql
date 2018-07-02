'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _teamSl = require('../../object-types/team-sl');

var _teamSl2 = _interopRequireDefault(_teamSl);

var _setup = require('../../../model/setup');

var _teamOverview = require('../../object-types/manual/team-overview');

var _teamRoster = require('../../object-types/manual/team-roster');

var _trade = require('../../../model/trade');

var _trade2 = _interopRequireDefault(_trade);

var _tradeStatus = require('../../object-types/enum/trade-status');

var _tradeStatus2 = _interopRequireDefault(_tradeStatus);

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
  team_roster: _teamRoster.ManualTeamRosterQuery,
  team_trades: {
    type: GraphQLInt,
    args: {
      id_sl: {
        name: 'id_sl',
        type: GraphQLInt
      }
    },
    resolve: function resolve(root, args) {
      return _trade2.default.count({
        where: {
          id_receiver: args.id_sl,
          status_trade: _tradeStatus2.default.parseValue('PENDING')
        }
      });
    }
  }
};

exports.default = TeamSLQuery;