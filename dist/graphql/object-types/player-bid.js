"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerBid = void 0;

var _graphql = require("graphql");

var _setup = require("../../model/setup");

var _player = _interopRequireDefault(require("./player"));

var _playerBidHistory = require("./player-bid-history");

var _teamSl = _interopRequireDefault(require("./team-sl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var resolver = require('graphql-sequelize').resolver;

var PlayerBid = new _graphql.GraphQLObjectType({
  name: 'PlayerBid',
  fields: function fields() {
    return {
      id_bid: {
        type: _graphql.GraphQLInt
      },
      id_auction: {
        type: _graphql.GraphQLInt
      },
      id_sl: {
        type: _graphql.GraphQLInt
      },
      id_player: {
        type: _graphql.GraphQLInt
      },
      expiration: {
        type: _graphql.GraphQLString
      },
      salary: {
        type: _graphql.GraphQLFloat
      },
      years: {
        type: _graphql.GraphQLInt
      },
      processed: {
        type: GraphQLBoolean
      },
      player: {
        type: _player["default"],
        resolve: resolver(_setup.PlayerBid.Player)
      },
      team: {
        type: _teamSl["default"],
        resolve: resolver(_setup.PlayerBid.Team)
      },
      history: {
        type: new _graphql.GraphQLList(_playerBidHistory.PlayerBidHistory),
        resolve: resolver(_setup.PlayerBid.History)
      }
    };
  }
});
exports.PlayerBid = PlayerBid;