'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('./rule/user');

var _user2 = _interopRequireDefault(_user);

var _team = require('./rule/team');

var _team2 = _interopRequireDefault(_team);

var _trade = require('./rule/trade');

var _trade2 = _interopRequireDefault(_trade);

var _draft = require('./rule/draft');

var _league = require('./rule/league');

var _game = require('./rule/game');

var _player = require('./rule/player');

var _gameNba = require('./rule/game-nba');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql');

var GraphQLObjectType = graphql.GraphQLObjectType;


var RootMutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: function fields() {
    return Object.assign({}, _user2.default, _team2.default, _trade2.default, _draft.DraftMutation, _league.LeagueMutation, _game.GameMutation, _player.PlayerMutation, _gameNba.GameNbaMutation);
  }
});

exports.default = RootMutationType;