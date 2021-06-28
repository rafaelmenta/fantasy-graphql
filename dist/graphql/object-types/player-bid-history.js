"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerBidHistory = void 0;

var _graphql = require("graphql");

var _setup = require("../../model/setup");

var _player = _interopRequireDefault(require("./player"));

var _playerBid = require("./player-bid");

var _teamSl = _interopRequireDefault(require("./team-sl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var resolver = require('graphql-sequelize').resolver;

var PlayerBidHistory = new _graphql.GraphQLObjectType({
  name: 'PlayerBidHistory',
  fields: function fields() {
    var _ref;

    return _ref = {
      id_bid: {
        type: _graphql.GraphQLInt
      }
    }, _defineProperty(_ref, "id_bid", {
      type: _graphql.GraphQLInt
    }), _defineProperty(_ref, "id_sl", {
      type: _graphql.GraphQLInt
    }), _defineProperty(_ref, "id_player", {
      type: _graphql.GraphQLInt
    }), _defineProperty(_ref, "bid_time", {
      type: _graphql.GraphQLString
    }), _defineProperty(_ref, "salary", {
      type: _graphql.GraphQLFloat
    }), _defineProperty(_ref, "years", {
      type: _graphql.GraphQLInt
    }), _defineProperty(_ref, "player", {
      type: _player["default"],
      resolve: resolver(_setup.PlayerBidHistory.Player)
    }), _defineProperty(_ref, "team", {
      type: _teamSl["default"],
      resolve: resolver(_setup.PlayerBidHistory.Team)
    }), _defineProperty(_ref, "bid", {
      type: _playerBid.PlayerBid,
      resolve: resolver(_setup.PlayerBidHistory.Bid)
    }), _ref;
  }
});
exports.PlayerBidHistory = PlayerBidHistory;