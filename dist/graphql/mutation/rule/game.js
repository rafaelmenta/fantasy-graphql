'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameMutation = undefined;

var _graphql = require('graphql');

var _game = require('../../../model/game');

var _game2 = _interopRequireDefault(_game);

var _game3 = require('../../object-types/game');

var _game4 = _interopRequireDefault(_game3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GameInput = new _graphql.GraphQLInputObjectType({
  name: 'GameInput',
  fields: function fields() {
    return {
      home_team: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) },
      away_team: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      id_type: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      id_round: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) }
    };
  }
});

var GameMutation = exports.GameMutation = {
  createGame: {
    description: 'Create a game',
    type: _game4.default,
    args: {
      game: { type: GameInput }
    },
    resolve: function resolve(root, _ref) {
      var game = _ref.game;
      return _game2.default.create(game);
    }
  },
  deleteGame: {
    description: 'Delete a game',
    type: _graphql.GraphQLInt,
    args: {
      id_game: { type: _graphql.GraphQLInt }
    },
    resolve: function resolve(root, _ref2) {
      var id_game = _ref2.id_game;
      return _game2.default.destroy({ where: { id_game: id_game } });
    }
  }
};