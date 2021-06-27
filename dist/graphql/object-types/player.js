"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _setup = require("../../model/setup");

var _teamNba = _interopRequireDefault(require("./team-nba"));

var _teamPlayer = _interopRequireDefault(require("./team-player"));

var _playerPerformance = _interopRequireDefault(require("./player-performance"));

var _playerStats = _interopRequireDefault(require("./player-stats"));

var _gameNba = _interopRequireDefault(require("./game-nba"));

var _constant = require("../../config/constant");

var _graphqlDate = _interopRequireDefault(require("graphql-date"));

var _tradeStatus = _interopRequireDefault(require("./enum/trade-status"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
      first_name: {
        type: GraphQLString
      },
      last_name: {
        type: GraphQLString
      },
      id_nba: {
        type: GraphQLInt
      },
      default_primary: {
        type: GraphQLString
      },
      default_secondary: {
        type: GraphQLString
      },
      player_slug: {
        type: GraphQLString
      },
      retired: {
        type: GraphQLBoolean
      },
      rookie: {
        type: GraphQLBoolean
      },
      birthdate: {
        type: _graphqlDate["default"]
      },
      contract_salary: {
        type: GraphQLFloat
      },
      contract_years: {
        type: GraphQLInt
      },
      team_info: {
        type: _teamPlayer["default"],
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
        type: _teamNba["default"],
        resolve: resolver(_setup.Player.TeamNba)
      },
      next_games: {
        type: new GraphQLList(_gameNba["default"]),
        resolve: _setup.Player.NextGames,
        args: {
          limit: {
            type: GraphQLInt,
            defaultValue: _constant.LIMIT_GAMES
          }
        }
      },
      performances: {
        type: new GraphQLList(_playerPerformance["default"]),
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
        type: new GraphQLList(_playerStats["default"]),
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
var _default = PlayerType;
exports["default"] = _default;