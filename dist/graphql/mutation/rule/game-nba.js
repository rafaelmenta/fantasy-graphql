'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameNbaMutation = undefined;

var _graphql = require('graphql');

var _gameNba = require('../../../model/game-nba');

var _gameNba2 = _interopRequireDefault(_gameNba);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GameNbaInput = new _graphql.GraphQLInputObjectType({
  name: 'GameNbaInput',
  fields: function fields() {
    return {
      id_away: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) },
      id_home: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) },
      id_round_home: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) },
      id_round_away: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) },
      game_time: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    };
  }
});

var GameNbaMutation = exports.GameNbaMutation = {
  addNbaGame: {
    description: 'Create an NBA game',
    type: _graphql.GraphQLInt,
    args: { input: { type: GameNbaInput } },
    resolve: function resolve(root, _ref) {
      var input = _ref.input;
      return _gameNba2.default.create(input).then(function (game) {
        return game.id_game_nba;
      });
    }
  },
  deleteNbaGame: {
    description: 'Delete an NBA game',
    type: _graphql.GraphQLInt,
    args: {
      id_game_nba: { type: _graphql.GraphQLInt }
    },
    resolve: function resolve(root, _ref2) {
      var id_game_nba = _ref2.id_game_nba;
      return _gameNba2.default.destroy({ where: { id_game_nba: id_game_nba } });
    }
  }
};