'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _teamSl = require('./team-sl');

var _teamSl2 = _interopRequireDefault(_teamSl);

var _round = require('./round');

var _round2 = _interopRequireDefault(_round);

var _playerTeamPerformance = require('./player-team-performance');

var _playerTeamPerformance2 = _interopRequireDefault(_playerTeamPerformance);

var _teamPerformance = require('./team-performance');

var _teamPerformance2 = _interopRequireDefault(_teamPerformance);

var _setup = require('../../model/setup');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList;


var GameType = new GraphQLObjectType({
  name: 'Game',
  fields: function fields() {
    return {
      id_game: { type: GraphQLInt },
      id_type: { type: GraphQLInt },
      id_round: { type: GraphQLInt },

      round: {
        type: _round2.default,
        resolve: resolver(_setup.Game.Round)
      },
      home_team: {
        type: _teamSl2.default,
        resolve: resolver(_setup.Game.HomeTeam)
      },
      away_team: {
        type: _teamSl2.default,
        resolve: resolver(_setup.Game.AwayTeam)
      },
      home_players: {
        type: new GraphQLList(_playerTeamPerformance2.default),
        resolve: _setup.Game.HomePlayers
      },
      away_players: {
        type: new GraphQLList(_playerTeamPerformance2.default),
        resolve: _setup.Game.AwayPlayers
      },
      home_performance: {
        type: _teamPerformance2.default,
        resolve: _setup.Game.HomePerformance
      },
      away_performance: {
        type: _teamPerformance2.default,
        resolve: _setup.Game.AwayPerformance,
        args: {
          id_sl: {
            name: 'id_sl',
            type: GraphQLInt
          }
        }
      }
    };
  }
});

exports.default = GameType;