"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gameNba = _interopRequireDefault(require("../../object-types/game-nba"));

var _setup = require("../../../model/setup");

var _connection = _interopRequireDefault(require("../../../database/connection"));

var _graphql = require("graphql");

var _graphqlSequelize = require("graphql-sequelize");

var _gamePerformance = require("../../object-types/manual/game-performance");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GameNbaQuery = {
  game_nba: {
    type: _gameNba["default"],
    resolve: (0, _graphqlSequelize.resolver)(_setup.GameNba),
    args: {
      id_game_nba: {
        name: 'id_game_nba',
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt)
      }
    }
  },
  date_games_nba: {
    type: new _graphql.GraphQLList(_gameNba["default"]),
    resolve: _setup.GameNba.DateGames,
    args: {
      date: {
        description: 'Format YYYY/MM/DD',
        type: _graphql.GraphQLString
      }
    }
  },
  ranged_date_games_nba: {
    type: new _graphql.GraphQLList(_gameNba["default"]),
    resolve: _setup.GameNba.RangedDateGames,
    args: {
      start_date: {
        description: 'Format YYYY/MM/DD',
        type: _graphql.GraphQLString
      },
      end_date: {
        description: 'Format YYYY/MM/DD',
        type: _graphql.GraphQLString
      }
    }
  },
  games_nba: {
    type: new _graphql.GraphQLList(_gameNba["default"]),
    resolve: (0, _graphqlSequelize.resolver)(_setup.GameNba),
    args: {
      id_home: {
        name: 'id_home',
        type: new _graphql.GraphQLList(_graphql.GraphQLInt)
      },
      id_away: {
        name: 'id_away',
        type: new _graphql.GraphQLList(_graphql.GraphQLInt)
      }
    }
  },
  active_games_nba: {
    type: new _graphql.GraphQLList(_gameNba["default"]),
    resolve: function resolve() {
      return _connection["default"].query("\n      SELECT g.*,\n        home_round.id_round as 'home_round.id_round',\n        home_round.round_number as 'home_round.round_number',\n        away_round.id_round as 'away_round.id_round',\n        away_round.round_number as 'away_round.round_number',\n        home.id_nba as 'home.id_nba',\n        home.city as 'home.city',\n        home.nickname as 'home.nickname',\n        home.symbol as 'home.symbol',\n        away.id_nba as 'away.id_nba',\n        away.city as 'away.city',\n        away.nickname as 'away.nickname',\n        away.symbol as 'away.symbol'\n      FROM game_nba g\n      JOIN team_nba home ON home.id_nba=g.id_home\n      JOIN team_nba away ON away.id_nba=g.id_away\n      JOIN round home_round ON home_round.id_round=g.id_round_home\n      JOIN round away_round ON away_round.id_round=g.id_round_away\n      JOIN season s on home_round.id_season=s.id_season\n      WHERE s.current=true\n        AND (home_round.opened = true OR away_round.opened= true)\n        AND (home_round.processed = false OR away_round.processed= false);\n    ", {
        model: _setup.GameNba
      });
    }
  },
  current_games_nba: {
    type: new _graphql.GraphQLList(_gameNba["default"]),
    resolve: function resolve() {
      return _connection["default"].query("\n      SELECT g.*,\n        home_round.id_round as 'home_round.id_round',\n        home_round.round_number as 'home_round.round_number',\n        away_round.id_round as 'away_round.id_round',\n        away_round.round_number as 'away_round.round_number',\n        home.id_nba as 'home.id_nba',\n        home.city as 'home.city',\n        home.nickname as 'home.nickname',\n        home.symbol as 'home.symbol',\n        away.id_nba as 'away.id_nba',\n        away.city as 'away.city',\n        away.nickname as 'away.nickname',\n        away.symbol as 'away.symbol'\n      FROM game_nba g\n      JOIN team_nba home ON home.id_nba=g.id_home\n      JOIN team_nba away ON away.id_nba=g.id_away\n      JOIN round home_round ON home_round.id_round=g.id_round_home\n      JOIN round away_round ON away_round.id_round=g.id_round_away\n      JOIN season s on home_round.id_season=s.id_season\n      WHERE s.current=true;\n    ", {
        model: _setup.GameNba
      });
    }
  },
  game_performance: _gamePerformance.ManualGamePerformanceQuery
};
var _default = GameNbaQuery;
exports["default"] = _default;