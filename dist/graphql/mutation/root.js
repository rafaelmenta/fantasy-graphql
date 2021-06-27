"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("./rule/user"));

var _team = _interopRequireDefault(require("./rule/team"));

var _trade = _interopRequireDefault(require("./rule/trade"));

var _draft = require("./rule/draft");

var _league = require("./rule/league");

var _game = require("./rule/game");

var _player = require("./rule/player");

var _gameNba = require("./rule/game-nba");

var _team2 = require("./rule/team.performance");

var _round = require("./rule/round");

var _auction = require("./rule/auction");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var graphql = require('graphql');

var GraphQLObjectType = graphql.GraphQLObjectType;
var RootMutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: function fields() {
    return Object.assign({}, _user["default"], _team["default"], _trade["default"], _draft.DraftMutation, _league.LeagueMutation, _game.GameMutation, _player.PlayerMutation, _gameNba.GameNbaMutation, _team2.TeamPerformanceMutation, _round.RoundMutation, _auction.AuctionMutation);
  }
});
var _default = RootMutationType;
exports["default"] = _default;