'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _teamPerformance = require('../../object-types/team-performance');

var _teamPerformance2 = _interopRequireDefault(_teamPerformance);

var _setup = require('../../../model/setup');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLNonNull = graphql.GraphQLNonNull;


var TeamPerformanceQuery = {
  team_performance: {
    type: _teamPerformance2.default,
    resolve: resolver(_setup.TeamPerformance),
    args: {
      id_player_performance: {
        name: 'tpf_code',
        type: new GraphQLNonNull(GraphQLInt)
      }
    }
  },
  team_performances: {
    type: new GraphQLList(_teamPerformance2.default),
    resolve: resolver(_setup.TeamPerformance),
    args: {
      id_round: {
        name: 'id_round',
        type: new GraphQLList(GraphQLInt)
      },
      id_sl: {
        name: 'id_sl',
        type: new GraphQLList(GraphQLInt)
      }
    }
  }
};

exports.default = TeamPerformanceQuery;