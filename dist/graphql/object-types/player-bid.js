'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerBid = undefined;

var _graphql = require('graphql');

var _setup = require('../../model/setup');

var _player = require('./player');

var _player2 = _interopRequireDefault(_player);

var _teamSl = require('./team-sl');

var _teamSl2 = _interopRequireDefault(_teamSl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resolver = require('graphql-sequelize').resolver;

var PlayerBid = exports.PlayerBid = new _graphql.GraphQLObjectType({
  name: 'PlayerBid',
  fields: function fields() {
    return {
      id_bid: { type: _graphql.GraphQLInt },
      id_auction: { type: _graphql.GraphQLInt },
      id_sl: { type: _graphql.GraphQLInt },
      id_player: { type: _graphql.GraphQLInt },
      expiration: { type: _graphql.GraphQLString },
      salary: { type: _graphql.GraphQLFloat },
      years: { type: _graphql.GraphQLInt },

      player: {
        type: _player2.default,
        resolve: resolver(_setup.PlayerBid.Player)
      },

      team: {
        type: _teamSl2.default,
        resolve: resolver(_setup.PlayerBid.Team)
      }
    };
  }
});