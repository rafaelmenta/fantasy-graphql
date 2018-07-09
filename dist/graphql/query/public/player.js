'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _player = require('../../object-types/player');

var _player2 = _interopRequireDefault(_player);

var _player3 = require('../../../model/player');

var _player4 = _interopRequireDefault(_player3);

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
    resolve: resolver(_player4.default),
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
    resolve: function resolve() {
      return _player4.default.findAll({
        where: { retired: false }
      });
    }
  }
};

exports.default = PlayerQuery;