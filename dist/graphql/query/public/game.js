'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _game = require('../../object-types/game');

var _game2 = _interopRequireDefault(_game);

var _setup = require('../../../model/setup');

var _gameType = require('../../object-types/enum/game-type');

var _gameType2 = _interopRequireDefault(_gameType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLNonNull = graphql.GraphQLNonNull;


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
  }
};

exports.default = GameQuery;