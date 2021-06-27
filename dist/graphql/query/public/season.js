"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _season = _interopRequireDefault(require("../../object-types/season"));

var _setup = require("../../../model/setup");

var _connection = _interopRequireDefault(require("../../../database/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLNonNull = graphql.GraphQLNonNull;
var SeasonQuery = {
  season: {
    type: _season["default"],
    resolve: resolver(_setup.Season),
    args: {
      id_season: {
        name: 'id_season',
        type: new GraphQLNonNull(GraphQLInt)
      }
    }
  },
  current_season: {
    type: _season["default"],
    resolve: _setup.Season.Current
  },
  seasons: {
    type: new GraphQLList(_season["default"]),
    resolve: resolver(_setup.Season)
  },
  available_seasons: {
    type: new GraphQLList(_season["default"]),
    resolve: function resolve() {
      return _connection["default"].query("\n      SELECT *\n      FROM season a\n      WHERE a.id_season >= (\n        SELECT id_season\n        FROM season b\n        WHERE b.current = true)\n    ", {
        model: _setup.Season
      });
    }
  }
};
var _default = SeasonQuery;
exports["default"] = _default;