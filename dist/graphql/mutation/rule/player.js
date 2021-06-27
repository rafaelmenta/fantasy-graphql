"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerMutation = void 0;

var _connection = _interopRequireDefault(require("../../../database/connection"));

var _player = _interopRequireDefault(require("../../../model/player"));

var _setup = require("../../../model/setup");

var _graphql = require("graphql");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var input = new _graphql.GraphQLInputObjectType({
  name: 'PlayerInput',
  fields: function fields() {
    return {
      id_player: {
        type: _graphql.GraphQLInt
      },
      first_name: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      },
      last_name: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      },
      player_slug: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      },
      default_primary: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      },
      default_secondary: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      },
      id_nba: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt)
      },
      rookie: {
        type: _graphql.GraphQLBoolean
      },
      birthdate: {
        type: _graphql.GraphQLString
      }
    };
  }
});
var PlayerMutation = {
  retirePlayer: {
    description: 'Retire a player',
    type: new _graphql.GraphQLList(_graphql.GraphQLInt),
    args: {
      id_player: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt)
      }
    },
    resolve: function resolve(root, _ref) {
      var id_player = _ref.id_player;
      return _player["default"].update({
        retired: true
      }, {
        where: {
          id_player: id_player
        }
      });
    }
  },
  savePlayer: {
    description: 'Update player info',
    type: _graphql.GraphQLInt,
    args: {
      player: {
        type: input
      }
    },
    resolve: function resolve(root, _ref2) {
      var player = _ref2.player;
      return _connection["default"].transaction(function (t) {
        var validPositions = ['PG', 'SG', 'SF', 'PF', 'C'];

        if (!validPositions.includes(player.default_primary)) {
          throw new Error("Invalid position: [".concat(player.default_primary, "]"));
        }

        if (!validPositions.includes(player.default_secondary)) {
          throw new Error("Invalid position: [".concat(player.default_secondary, "]"));
        }

        if (player.id_nba < 1 || player.id_nba > 31) {
          throw new Error("Invalid nba team: ".concat(player.id_nba));
        }

        var date = new Date(player.birthdate);
        var validDate = date instanceof Date && !isNaN(date);

        if (!validDate) {
          throw new Error("Invald birthdate: ".concat(player.birthdate));
        }

        var playerUpdate = {
          first_name: player.first_name,
          last_name: player.last_name,
          player_slug: player.player_slug,
          default_primary: player.default_primary,
          default_secondary: player.default_secondary,
          id_nba: player.id_nba,
          rookie: player.rookie,
          birthdate: player.birthdate
        };

        if (!player.id_player) {
          return _player["default"].create(playerUpdate, {
            transaction: t
          }).then(function (createdPlayer) {
            return _setup.Taxonomy.create({
              slug: player.player_slug,
              id: createdPlayer.id_player
            }, {
              transaction: t
            });
          }).then(function (createdTaxonomy) {
            return createdTaxonomy.id;
          });
        }

        var playerQuery = _player["default"].update(playerUpdate, {
          where: {
            id_player: player.id_player
          },
          transaction: t
        });

        var slugUpdate = {
          slug: player.player_slug
        };

        var slugQuery = _player["default"].findOne({
          where: {
            id_player: player.id_player
          }
        }, {
          transaction: t
        }).then(function (p) {
          return _setup.Taxonomy.update(slugUpdate, {
            where: {
              slug: p.player_slug
            },
            transaction: t
          });
        });

        return Promise.all([playerQuery, slugQuery]).then(function () {
          return player.id_player;
        });
      });
    }
  }
};
exports.PlayerMutation = PlayerMutation;