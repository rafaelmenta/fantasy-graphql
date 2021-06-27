"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _player = _interopRequireDefault(require("../../object-types/player"));

var _player2 = _interopRequireDefault(require("../../../model/player"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLString = graphql.GraphQLString,
    GraphQLNonNull = graphql.GraphQLNonNull;
var PlayerQuery = {
  player: {
    type: _player["default"],
    resolve: resolver(_player2["default"]),
    args: {
      id_player: {
        name: 'id_player',
        type: GraphQLInt
      },
      player_slug: {
        name: 'player_slug',
        type: GraphQLString
      }
    }
  },
  players: {
    type: new GraphQLList(_player["default"]),
    resolve: function resolve() {
      return _player2["default"].findAll({
        where: {
          retired: false
        }
      });
    }
  }
};
var _default = PlayerQuery;
exports["default"] = _default;