'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _setup = require('../../model/setup');

var _teamNba = require('./team-nba');

var _teamNba2 = _interopRequireDefault(_teamNba);

var _teamPlayer = require('./team-player');

var _teamPlayer2 = _interopRequireDefault(_teamPlayer);

var _playerPerformance = require('./player-performance');

var _playerPerformance2 = _interopRequireDefault(_playerPerformance);

var _playerStats = require('./player-stats');

var _playerStats2 = _interopRequireDefault(_playerStats);

var _gameNba = require('./game-nba');

var _gameNba2 = _interopRequireDefault(_gameNba);

var _constant = require('../../config/constant');

var _graphqlDate = require('graphql-date');

var _graphqlDate2 = _interopRequireDefault(_graphqlDate);

var _tradeStatus = require('./enum/trade-status');

var _tradeStatus2 = _interopRequireDefault(_tradeStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLFloat = graphql.GraphQLFloat,
    GraphQLNonNull = graphql.GraphQLNonNull,
    GraphQLBoolean = graphql.GraphQLBoolean,
    GraphQLList = graphql.GraphQLList;


var PlayerType = new GraphQLObjectType({
  name: 'Player',
  fields: function fields() {
    return {
      id_player: {
        type: GraphQLInt
      },
      first_name: { type: GraphQLString },
      last_name: { type: GraphQLString },
      id_nba: { type: GraphQLInt },
      default_primary: { type: GraphQLString },
      default_secondary: { type: GraphQLString },
      player_slug: { type: GraphQLString },
      retired: { type: GraphQLBoolean },
      rookie: { type: GraphQLBoolean },
      birthdate: { type: _graphqlDate2.default },
      contract_salary: { type: GraphQLFloat },
      contract_years: { type: GraphQLInt },

      team_info: {
        type: _teamPlayer2.default,
        resolve: _setup.Player.Team,
        args: {
          id_league: {
            type: GraphQLInt
          },
          id_sl: {
            type: GraphQLInt
          },
          slug: {
            type: GraphQLString
          }
        }
      },

      team_nba: {
        type: _teamNba2.default,
        resolve: resolver(_setup.Player.TeamNba)
      },

      next_games: {
        type: new GraphQLList(_gameNba2.default),
        resolve: _setup.Player.NextGames,
        args: {
          limit: {
            type: GraphQLInt,
            defaultValue: _constant.LIMIT_GAMES
          }
        }
      },

      performances: {
        type: new GraphQLList(_playerPerformance2.default),
        resolve: _setup.Player.Performances,
        args: {
          id_round: {
            name: 'id_round',
            type: new GraphQLList(GraphQLInt)
          },
          id_season: {
            name: 'id_season',
            type: GraphQLInt
          }
        }
      },

      stats: {
        type: new GraphQLList(_playerStats2.default),
        resolve: resolver(_setup.Player.Stats),
        args: {
          id_season: {
            name: 'id_season',
            type: new GraphQLList(GraphQLInt)
          }
        }
      }
    };
  }
});

exports.default = PlayerType;