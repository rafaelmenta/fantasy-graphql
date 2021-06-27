"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("./private/user"));

var _user2 = _interopRequireDefault(require("./public/user"));

var _teamSl = _interopRequireDefault(require("./public/team-sl"));

var _teamNba = _interopRequireDefault(require("./public/team-nba"));

var _player = _interopRequireDefault(require("./public/player"));

var _division = _interopRequireDefault(require("./public/division"));

var _conference = _interopRequireDefault(require("./public/conference"));

var _league = _interopRequireDefault(require("./public/league"));

var _game = _interopRequireDefault(require("./public/game"));

var _round = _interopRequireDefault(require("./public/round"));

var _season = _interopRequireDefault(require("./public/season"));

var _playerPerformance = _interopRequireDefault(require("./public/player-performance"));

var _teamPerformance = _interopRequireDefault(require("./public/team-performance"));

var _playerTeamPerformance = _interopRequireDefault(require("./public/player-team-performance"));

var _playerStats = _interopRequireDefault(require("./public/player-stats"));

var _teamStats = _interopRequireDefault(require("./public/team-stats"));

var _gameNba = _interopRequireDefault(require("./public/game-nba"));

var _draft = _interopRequireDefault(require("./public/draft"));

var _pick = _interopRequireDefault(require("./public/pick"));

var _trade = _interopRequireDefault(require("./public/trade"));

var _freeAgencyHistory = _interopRequireDefault(require("./public/free-agency-history"));

var _search = _interopRequireDefault(require("./public/search"));

var _archive = require("./public/archive");

var _system = require("./public/system");

var _auction = require("./public/auction");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType;
var Query = new GraphQLObjectType({
  name: 'Query',
  fields: function fields() {
    return Object.assign({}, _user["default"], _user2["default"], _teamSl["default"], _teamNba["default"], _player["default"], _division["default"], _conference["default"], _league["default"], _game["default"], _round["default"], _season["default"], _playerPerformance["default"], _teamPerformance["default"], _playerTeamPerformance["default"], _playerStats["default"], _teamStats["default"], _gameNba["default"], _draft["default"], _pick["default"], _trade["default"], _freeAgencyHistory["default"], _search["default"], _archive.ArchiveQuery, _system.SystemQuery, _auction.AuctionQuery);
  }
});
var _default = Query;
exports["default"] = _default;