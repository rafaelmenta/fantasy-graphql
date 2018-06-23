'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _player = require('./player');

var _player2 = _interopRequireDefault(_player);

var _division = require('./division');

var _division2 = _interopRequireDefault(_division);

var _pick = require('./pick');

var _pick2 = _interopRequireDefault(_pick);

var _trade = require('./trade');

var _trade2 = _interopRequireDefault(_trade);

var _teamStats = require('./team-stats');

var _teamStats2 = _interopRequireDefault(_teamStats);

var _teamSeason = require('./team-season');

var _teamSeason2 = _interopRequireDefault(_teamSeason);

var _game = require('./game');

var _game2 = _interopRequireDefault(_game);

var _setup = require('../../model/setup');

var _tradeStatus = require('./enum/trade-status');

var _tradeStatus2 = _interopRequireDefault(_tradeStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      id_sl: { type: GraphQLInt },
      city: { type: GraphQLString },
      nickname: { type: GraphQLString },
      symbol: { type: GraphQLString },
      primary_color: { type: GraphQLString },
      secondary_color: { type: GraphQLString },
      slug: { type: GraphQLString },

      users: {
        type: new GraphQLList(_user2.default),
        resolve: resolver(_setup.TeamSl.Users)
      },
      players: {
        type: new GraphQLList(_player2.default),
        resolve: resolver(_setup.TeamSl.Players)
      },
      division: {
        type: _division2.default,
        resolve: resolver(_setup.TeamSl.Division)
      },
      stats: {
        type: _teamStats2.default,
        resolve: _setup.TeamSl.Stats,
        args: {
          id_season: {
            type: GraphQLInt,
            defaultValue: 'CURRENT'
          }
        }
      },
      picks: {
        type: new GraphQLList(_pick2.default),
        resolve: _setup.TeamSl.Picks
      },
      record: {
        type: _teamSeason2.default,
        resolve: _setup.TeamSl.Record,
        args: {
          id_season: {
            type: GraphQLInt,
            defaultValue: 'CURRENT'
          }
        }
      },
      sent_trades: {
        type: new GraphQLList(_trade2.default),
        resolve: resolver(_setup.TeamSl.SentTrades),
        args: {
          status_trade: {
            name: 'status_trade',
            type: new GraphQLList(GraphQLInt),
            defaultValue: _tradeStatus2.default.parseValue('PENDING')
          }
        }
      },
      received_trades: {
        type: new GraphQLList(_trade2.default),
        resolve: resolver(_setup.TeamSl.ReceivedTrades),
        args: {
          status_trade: {
            name: 'status_trade',
            type: new GraphQLList(GraphQLInt),
            defaultValue: _tradeStatus2.default.parseValue('PENDING')
          }
        }
      },
      recent_games: {
        type: new GraphQLList(_game2.default),
        resolve: _setup.TeamSl.RecentGames
      },
      next_games: {
        type: new GraphQLList(_game2.default),
        resolve: _setup.TeamSl.NextGames
      },
      all_games: {
        type: new GraphQLList(_game2.default),
        resolve: _setup.TeamSl.AllGames,
        args: {
          id_season: {
            name: 'id_season',
            type: GraphQLInt
          }
        }
      },
      records: {
        type: new GraphQLList(_teamSeason2.default),
        resolve: resolver(_setup.TeamSl.Records),
        args: {
          id_season: { type: new GraphQLList(GraphQLInt) }
        }
      }
    };
  }
});

exports.default = TeamSlType;