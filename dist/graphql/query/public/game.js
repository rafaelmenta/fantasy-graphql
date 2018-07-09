'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _game = require('../../object-types/game');

var _game2 = _interopRequireDefault(_game);

var _gameType = require('../../object-types/enum/game-type');

var _gameType2 = _interopRequireDefault(_gameType);

var _setup = require('../../../model/setup');

var _conference = require('../../../model/conference');

var _conference2 = _interopRequireDefault(_conference);

var _season = require('../../../model/season');

var _season2 = _interopRequireDefault(_season);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Game from '../../../model/game';
var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLNonNull = graphql.GraphQLNonNull;


var teamMap = {};

var GameQuery = {
  games: {
    type: new GraphQLList(_game2.default),
    resolve: resolver(_setup.Game),
    args: {
      id_game: {
        name: 'id_game',
        type: new GraphQLList(GraphQLInt)
      },
      id_round: {
        name: 'id_round',
        type: new GraphQLList(GraphQLInt)
      },
      id_type: {
        name: 'id_type',
        type: new GraphQLList(_gameType2.default)
      },
      home_team: {
        name: 'home_team',
        type: new GraphQLList(GraphQLInt)
      },
      away_team: {
        name: 'away_team',
        type: new GraphQLList(GraphQLInt)
      }
    }
  },
  game: {
    type: _game2.default,
    resolve: resolver(_setup.Game),
    args: {
      id_game: {
        name: 'id_game',
        type: new GraphQLNonNull(GraphQLInt)
      }
    }
  },
  league_games: {
    type: new GraphQLList(_game2.default),
    args: {
      id_league: {
        name: 'id_league',
        type: new GraphQLNonNull(GraphQLInt)
      }
    },
    resolve: function resolve(root, _ref) {
      var id_league = _ref.id_league;
      return _setup.Game.findAll({
        include: [{ model: _setup.Round, include: [{ model: _season2.default, where: { current: true } }] }, _setup.Game.HomeTeam, _setup.Game.AwayTeam],
        where: {
          id_type: [_gameType2.default.parseValue('LEAGUE'), _gameType2.default.parseValue('PLAYOFF')],
          id_league: _sequelize2.default.where(_sequelize2.default.col('home.league_id'), id_league)
        }
      });
    }
  }
};

exports.default = GameQuery;