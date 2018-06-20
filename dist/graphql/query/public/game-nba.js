'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _gameNba = require('../../object-types/game-nba');

var _gameNba2 = _interopRequireDefault(_gameNba);

var _setup = require('../../../model/setup');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLString = graphql.GraphQLString,
    GraphQLNonNull = graphql.GraphQLNonNull;


var GameNbaQuery = {
  game_nba: {
    type: _gameNba2.default,
    resolve: resolver(_setup.GameNba),
    args: {
      id_game_nba: {
        name: 'id_game_nba',
        type: new GraphQLNonNull(GraphQLInt)

      }
    }
  },
  date_games_nba: {
    type: new GraphQLList(_gameNba2.default),
    resolve: _setup.GameNba.DateGames,
    args: {
      date: {
        description: 'Format YYYY/MM/DD',
        type: GraphQLString
      }
    }
  },
  ranged_date_games_nba: {
    type: new GraphQLList(_gameNba2.default),
    resolve: _setup.GameNba.RangedDateGames,
    args: {
      start_date: {
        description: 'Format YYYY/MM/DD',
        type: GraphQLString
      },
      end_date: {
        description: 'Format YYYY/MM/DD',
        type: GraphQLString
      }
    }
  },
  games_nba: {
    type: new GraphQLList(_gameNba2.default),
    resolve: resolver(_setup.GameNba),
    args: {
      id_home: {
        name: 'id_home',
        type: new GraphQLList(GraphQLInt)
      },
      id_away: {
        name: 'id_away',
        type: new GraphQLList(GraphQLInt)
      }
    }
  }
};

exports.default = GameNbaQuery;