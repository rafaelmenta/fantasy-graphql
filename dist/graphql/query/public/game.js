"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _game = _interopRequireDefault(require("../../object-types/game"));

var _gameType = _interopRequireDefault(require("../../object-types/enum/game-type"));

var _setup = require("../../../model/setup");

var _conference = _interopRequireDefault(require("../../../model/conference"));

var _season = _interopRequireDefault(require("../../../model/season"));

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import Game from '../../../model/game';
var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLNonNull = graphql.GraphQLNonNull;
var teamMap = {};
var GameQuery = {
  games: {
    type: new GraphQLList(_game["default"]),
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
        type: new GraphQLList(_gameType["default"])
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
    type: _game["default"],
    resolve: resolver(_setup.Game),
    args: {
      id_game: {
        name: 'id_game',
        type: new GraphQLNonNull(GraphQLInt)
      }
    }
  },
  league_games: {
    type: new GraphQLList(_game["default"]),
    args: {
      id_league: {
        name: 'id_league',
        type: new GraphQLNonNull(GraphQLInt)
      }
    },
    resolve: function resolve(root, _ref) {
      var id_league = _ref.id_league;
      return _setup.Game.findAll({
        include: [{
          model: _setup.Round,
          include: [{
            model: _season["default"],
            where: {
              current: true
            }
          }]
        }, _setup.Game.HomeTeam, _setup.Game.AwayTeam],
        where: {
          id_type: [_gameType["default"].parseValue('LEAGUE'), _gameType["default"].parseValue('PLAYOFF')],
          id_league: _sequelize["default"].where(_sequelize["default"].col('home.league_id'), id_league)
        }
      });
    }
  }
};
var _default = GameQuery;
exports["default"] = _default;