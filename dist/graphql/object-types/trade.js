'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _teamSl = require('./team-sl');

var _teamSl2 = _interopRequireDefault(_teamSl);

var _player = require('./player');

var _player2 = _interopRequireDefault(_player);

var _pick = require('./pick');

var _pick2 = _interopRequireDefault(_pick);

var _setup = require('../../model/setup');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList;


var TradeType = new GraphQLObjectType({
  name: 'Trade',
  fields: function fields() {
    return {
      id_trade: {
        type: GraphQLInt
      },
      id_sender: {
        type: GraphQLInt
      },
      id_receiver: {
        type: GraphQLInt
      },
      status_trade: {
        type: GraphQLInt
      },
      trade_comment: {
        type: GraphQLString
      },
      last_change: { type: GraphQLString },
      views: { type: GraphQLInt },
      sender: {
        type: _teamSl2.default,
        resolve: resolver(_setup.Trade.Sender)
      },
      receiver: {
        type: _teamSl2.default,
        resolve: resolver(_setup.Trade.Receiver)
      },
      sender_players: {
        type: new GraphQLList(_player2.default),
        resolve: _setup.Trade.SenderPlayers
      },
      receiver_players: {
        type: new GraphQLList(_player2.default),
        resolve: _setup.Trade.ReceiverPlayers
      },
      sender_picks: {
        type: new GraphQLList(_pick2.default),
        resolve: _setup.Trade.SenderPicks
      },
      receiver_picks: {
        type: new GraphQLList(_pick2.default),
        resolve: _setup.Trade.ReceiverPicks
      }
    };
  }
});

exports.default = TradeType;