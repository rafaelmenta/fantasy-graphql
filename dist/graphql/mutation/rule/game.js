'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameMutation = void 0;

var _graphql = require("graphql");

var _game = _interopRequireDefault(require("../../../model/game"));

var _game2 = _interopRequireDefault(require("../../object-types/game"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GameInput = new _graphql.GraphQLInputObjectType({
  name: 'GameInput',
  fields: function fields() {
    return {
      home_team: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt)
      },
      away_team: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt)
      },
      id_type: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt)
      },
      id_round: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt)
      }
    };
  }
});
var GameMutation = {
  createGame: {
    description: 'Create a game',
    type: _game2["default"],
    args: {
      game: {
        type: GameInput
      }
    },
    resolve: function resolve(root, _ref) {
      var game = _ref.game;
      return _game["default"].create(game);
    }
  },
  deleteGame: {
    description: 'Delete a game',
    type: _graphql.GraphQLInt,
    args: {
      id_game: {
        type: _graphql.GraphQLInt
      }
    },
    resolve: function resolve(root, _ref2) {
      var id_game = _ref2.id_game;
      return _game["default"].destroy({
        where: {
          id_game: id_game
        }
      });
    }
  }
};
exports.GameMutation = GameMutation;