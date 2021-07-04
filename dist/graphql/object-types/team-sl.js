"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("./user"));

var _player = _interopRequireDefault(require("./player"));

var _division = _interopRequireDefault(require("./division"));

var _pick = _interopRequireDefault(require("./pick"));

var _trade = _interopRequireDefault(require("./trade"));

var _teamStats = _interopRequireDefault(require("./team-stats"));

var _teamSeason = _interopRequireDefault(require("./team-season"));

var _game = _interopRequireDefault(require("./game"));

var _setup = require("../../model/setup");

var _tradeStatus = _interopRequireDefault(require("./enum/trade-status"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLNonNull = graphql.GraphQLNonNull,
    GraphQLList = graphql.GraphQLList;
var TeamSlType = new GraphQLObjectType({
  name: 'TeamSl',
  fields: function fields() {
    return {
      id_sl: {
        type: GraphQLInt
      },
      id_division: {
        type: GraphQLInt
      },
      league_id: {
        type: GraphQLInt
      },
      city: {
        type: GraphQLString
      },
      nickname: {
        type: GraphQLString
      },
      symbol: {
        type: GraphQLString
      },
      primary_color: {
        type: GraphQLString
      },
      secondary_color: {
        type: GraphQLString
      },
      slug: {
        type: GraphQLString
      },
      waiver: {
        type: GraphQLInt
      },
      users: {
        type: new GraphQLList(_user["default"]),
        resolve: resolver(_setup.TeamSl.Users)
      },
      players: {
        type: new GraphQLList(_player["default"]),
        resolve: resolver(_setup.TeamSl.Players)
      },
      division: {
        type: _division["default"],
        resolve: resolver(_setup.TeamSl.Division)
      },
      stats: {
        type: _teamStats["default"],
        resolve: _setup.TeamSl.Stats,
        args: {
          id_season: {
            type: GraphQLInt,
            defaultValue: 'CURRENT'
          }
        }
      },
      picks: {
        type: new GraphQLList(_pick["default"]),
        resolve: _setup.TeamSl.Picks
      },
      record: {
        type: _teamSeason["default"],
        resolve: _setup.TeamSl.Record,
        args: {
          id_season: {
            type: GraphQLInt,
            defaultValue: 'CURRENT'
          }
        }
      },
      sent_trades: {
        type: new GraphQLList(_trade["default"]),
        resolve: resolver(_setup.TeamSl.SentTrades),
        args: {
          status_trade: {
            name: 'status_trade',
            type: new GraphQLList(GraphQLInt),
            defaultValue: _tradeStatus["default"].parseValue('PENDING')
          }
        }
      },
      received_trades: {
        type: new GraphQLList(_trade["default"]),
        resolve: resolver(_setup.TeamSl.ReceivedTrades),
        args: {
          status_trade: {
            name: 'status_trade',
            type: new GraphQLList(GraphQLInt),
            defaultValue: _tradeStatus["default"].parseValue('PENDING')
          }
        }
      },
      recent_games: {
        type: new GraphQLList(_game["default"]),
        resolve: _setup.TeamSl.RecentGames
      },
      next_games: {
        type: new GraphQLList(_game["default"]),
        resolve: _setup.TeamSl.NextGames
      },
      all_games: {
        type: new GraphQLList(_game["default"]),
        resolve: _setup.TeamSl.AllGames,
        args: {
          id_season: {
            name: 'id_season',
            type: GraphQLInt
          }
        }
      },
      playoffs_games: {
        type: new GraphQLList(_game["default"]),
        resolve: _setup.TeamSl.PlayoffsGames,
        args: {
          id_season: {
            name: 'id_season',
            type: GraphQLInt
          }
        }
      },
      records: {
        type: new GraphQLList(_teamSeason["default"]),
        resolve: resolver(_setup.TeamSl.Records),
        args: {
          id_season: {
            type: new GraphQLList(GraphQLInt)
          }
        }
      }
    };
  }
});
var _default = TeamSlType;
exports["default"] = _default;