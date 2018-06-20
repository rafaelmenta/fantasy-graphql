'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('./private/user');

var _user2 = _interopRequireDefault(_user);

var _user3 = require('./public/user');

var _user4 = _interopRequireDefault(_user3);

var _teamSl = require('./public/team-sl');

var _teamSl2 = _interopRequireDefault(_teamSl);

var _teamNba = require('./public/team-nba');

var _teamNba2 = _interopRequireDefault(_teamNba);

var _player = require('./public/player');

var _player2 = _interopRequireDefault(_player);

var _division = require('./public/division');

var _division2 = _interopRequireDefault(_division);

var _conference = require('./public/conference');

var _conference2 = _interopRequireDefault(_conference);

var _league = require('./public/league');

var _league2 = _interopRequireDefault(_league);

var _game = require('./public/game');

var _game2 = _interopRequireDefault(_game);

var _round = require('./public/round');

var _round2 = _interopRequireDefault(_round);

var _season = require('./public/season');

var _season2 = _interopRequireDefault(_season);

var _playerPerformance = require('./public/player-performance');

var _playerPerformance2 = _interopRequireDefault(_playerPerformance);

var _teamPerformance = require('./public/team-performance');

var _teamPerformance2 = _interopRequireDefault(_teamPerformance);

var _playerTeamPerformance = require('./public/player-team-performance');

var _playerTeamPerformance2 = _interopRequireDefault(_playerTeamPerformance);

var _playerStats = require('./public/player-stats');

var _playerStats2 = _interopRequireDefault(_playerStats);

var _teamStats = require('./public/team-stats');

var _teamStats2 = _interopRequireDefault(_teamStats);

var _gameNba = require('./public/game-nba');

var _gameNba2 = _interopRequireDefault(_gameNba);

var _draft = require('./public/draft');

var _draft2 = _interopRequireDefault(_draft);

var _pick = require('./public/pick');

var _pick2 = _interopRequireDefault(_pick);

var _trade = require('./public/trade');

var _trade2 = _interopRequireDefault(_trade);

var _freeAgencyHistory = require('./public/free-agency-history');

var _freeAgencyHistory2 = _interopRequireDefault(_freeAgencyHistory);

var _search = require('./public/search');

var _search2 = _interopRequireDefault(_search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType;


var Query = new GraphQLObjectType({
  name: 'Query',
  fields: function fields() {
    return Object.assign({}, _user2.default, _user4.default, _teamSl2.default, _teamNba2.default, _player2.default, _division2.default, _conference2.default, _league2.default, _game2.default, _round2.default, _season2.default, _playerPerformance2.default, _teamPerformance2.default, _playerTeamPerformance2.default, _playerStats2.default, _teamStats2.default, _gameNba2.default, _draft2.default, _pick2.default, _trade2.default, _freeAgencyHistory2.default, _search2.default);
  }
});

exports.default = Query;