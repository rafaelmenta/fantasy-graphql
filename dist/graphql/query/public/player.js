'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _player = require('../../object-types/player');

var _player2 = _interopRequireDefault(_player);

var _setup = require('../../../model/setup');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLString = graphql.GraphQLString,
    GraphQLNonNull = graphql.GraphQLNonNull;


var PlayerQuery = {
  player: {
    type: _player2.default,
    resolve: resolver(_setup.Player),
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
    type: new GraphQLList(_player2.default),
    resolve: resolver(_setup.Player)
  }
};

exports.default = PlayerQuery;