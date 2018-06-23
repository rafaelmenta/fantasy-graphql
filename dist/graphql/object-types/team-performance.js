'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _setup = require('../../model/setup');

var _teamSl = require('./team-sl');

var _teamSl2 = _interopRequireDefault(_teamSl);

var _round = require('./round');

var _round2 = _interopRequireDefault(_round);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLFloat = graphql.GraphQLFloat,
    GraphQLBoolean = graphql.GraphQLBoolean,
    GraphQLList = graphql.GraphQLList;


var TeamPerformanceType = new GraphQLObjectType({
  name: 'TeamPerformance',
  fields: function fields() {
    return {

      tpf_code: { type: GraphQLInt },
      minutes_pg: { type: GraphQLInt },
      minutes_sg: { type: GraphQLInt },
      minutes_sf: { type: GraphQLInt },
      minutes_pf: { type: GraphQLInt },
      minutes_c: { type: GraphQLInt },
      fantasy_points: { type: GraphQLFloat },

      team_sl: {
        type: _teamSl2.default,
        resolve: resolver(_setup.TeamPerformance.Team)
      },
      round: {
        type: _round2.default,
        resolve: resolver(_setup.TeamPerformance.Round)
      }
    };
  }
});

exports.default = TeamPerformanceType;