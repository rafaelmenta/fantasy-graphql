'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _setup = require('../../model/setup');

var _player = require('./player');

var _player2 = _interopRequireDefault(_player);

var _teamSl = require('./team-sl');

var _teamSl2 = _interopRequireDefault(_teamSl);

var _round = require('./round');

var _round2 = _interopRequireDefault(_round);

var _playerPerformance = require('./player-performance');

var _playerPerformance2 = _interopRequireDefault(_playerPerformance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLFloat = graphql.GraphQLFloat,
    GraphQLBoolean = graphql.GraphQLBoolean,
    GraphQLList = graphql.GraphQLList;


var PlayerTeamPerformanceType = new GraphQLObjectType({
  name: 'PlayerTeamPerformance',
  fields: function fields() {
    return {
      ptp_code: { type: GraphQLInt },
      id_sl: { type: GraphQLInt },
      id_round: { type: GraphQLInt },
      id_player: { type: GraphQLInt },
      fantasy_points: { type: GraphQLFloat },
      order: { type: GraphQLInt },
      primary_position: { type: GraphQLString },
      secondary_position: { type: GraphQLString },
      minutes_primary: { type: GraphQLInt },
      minutes_secondary: { type: GraphQLInt },
      player: {
        type: _player2.default,
        resolve: resolver(_setup.PlayerTeamPerformance.Player)
      },
      round: {
        type: _round2.default,
        resolve: resolver(_setup.PlayerTeamPerformance.Round)
      },
      team_sl: {
        type: _teamSl2.default,
        resolve: resolver(_setup.PlayerTeamPerformance.TeamSl)
      },
      performance: {
        type: _playerPerformance2.default,
        resolve: _setup.PlayerTeamPerformance.PlayerPerformance
      }
    };
  }
});

exports.default = PlayerTeamPerformanceType;