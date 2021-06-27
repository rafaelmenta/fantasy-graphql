"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _teamSl = _interopRequireDefault(require("./team-sl"));

var _player = _interopRequireDefault(require("./player"));

var _pick = _interopRequireDefault(require("./pick"));

var _setup = require("../../model/setup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
      last_change: {
        type: GraphQLString
      },
      views: {
        type: GraphQLInt
      },
      sender: {
        type: _teamSl["default"],
        resolve: resolver(_setup.Trade.Sender)
      },
      receiver: {
        type: _teamSl["default"],
        resolve: resolver(_setup.Trade.Receiver)
      },
      sender_players: {
        type: new GraphQLList(_player["default"]),
        resolve: _setup.Trade.SenderPlayers
      },
      receiver_players: {
        type: new GraphQLList(_player["default"]),
        resolve: _setup.Trade.ReceiverPlayers
      },
      sender_picks: {
        type: new GraphQLList(_pick["default"]),
        resolve: _setup.Trade.SenderPicks
      },
      receiver_picks: {
        type: new GraphQLList(_pick["default"]),
        resolve: _setup.Trade.ReceiverPicks
      }
    };
  }
});
var _default = TradeType;
exports["default"] = _default;