'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DraftMutation = void 0;

var _player = _interopRequireDefault(require("../../object-types/player"));

var _draft = _interopRequireDefault(require("../../../model/draft"));

var _setup = require("../../../model/setup");

var _teamSl = _interopRequireDefault(require("../../../model/team-sl"));

var _draftStatus = _interopRequireDefault(require("../../object-types/enum/draft-status"));

var _connection = _interopRequireDefault(require("../../../database/connection"));

var _draft2 = _interopRequireDefault(require("../../object-types/draft"));

var _graphql = require("graphql");

var _graphqlSequelize = require("graphql-sequelize");

var _pick = _interopRequireDefault(require("../../object-types/pick"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DraftInput = new _graphql.GraphQLInputObjectType({
  name: 'DraftInput',
  fields: function fields() {
    return {
      id_season: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt)
      },
      id_league: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt)
      },
      draft_type: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt)
      },
      year_draft: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      },
      status_draft: {
        type: _graphql.GraphQLInt,
        defaultValue: _draftStatus["default"].parseValue('STATUS_CLOSED')
      }
    };
  }
});
var DraftMutation = {
  createDraft: {
    description: 'Create a draft',
    type: _draft2["default"],
    args: {
      draft: {
        type: DraftInput
      }
    },
    resolve: function resolve(root, _ref) {
      var draft = _ref.draft;
      return _draft["default"].create(draft);
    }
  },
  deleteDraft: {
    description: 'Delete a draft',
    type: _graphql.GraphQLInt,
    args: {
      id_draft: {
        type: _graphql.GraphQLInt
      }
    },
    resolve: function resolve(root, _ref2) {
      var id_draft = _ref2.id_draft;
      return _draft["default"].destroy({
        where: {
          id_draft: id_draft
        }
      });
    }
  },
  updateDraftStatus: {
    description: 'Update draft status',
    type: new _graphql.GraphQLList(_graphql.GraphQLInt),
    args: {
      id_draft: {
        type: _graphql.GraphQLInt
      },
      status_draft: {
        type: _graphql.GraphQLInt
      }
    },
    resolve: function resolve(root, _ref3) {
      var id_draft = _ref3.id_draft,
          status_draft = _ref3.status_draft;
      return _draft["default"].update({
        status_draft: status_draft
      }, {
        where: {
          id_draft: id_draft
        }
      });
    }
  },
  createRound: {
    description: 'Create picks for a Draft',
    type: new _graphql.GraphQLList(_pick["default"]),
    args: {
      id_draft: {
        type: _graphql.GraphQLInt
      },
      id_league: {
        type: _graphql.GraphQLInt
      },
      round: {
        type: _graphql.GraphQLInt
      }
    },
    resolve: function resolve(root, _ref4) {
      var id_draft = _ref4.id_draft,
          id_league = _ref4.id_league,
          round = _ref4.round;
      return _connection["default"].transaction(function (t) {
        return _teamSl["default"].findAll({
          where: {
            league_id: id_league
          }
        }).then(function (teams) {
          var creates = teams.map(function (team, index) {
            return _setup.Pick.create({
              id_draft: id_draft,
              round: round,
              order: index + 1,
              id_owner: team.id_sl,
              id_sl_original: team.id_sl,
              is_used: false
            }, {
              transaction: t
            });
          });
          return Promise.all(creates);
        });
      });
    }
  },
  deleteRound: {
    description: 'Delete picks of a round',
    type: _graphql.GraphQLInt,
    args: {
      id_draft: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt)
      },
      round: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt)
      }
    },
    resolve: function resolve(root, _ref5) {
      var id_draft = _ref5.id_draft,
          round = _ref5.round;
      return _setup.Pick.destroy({
        where: {
          id_draft: id_draft,
          round: round
        }
      });
    }
  },
  savePick: {
    description: 'Update a pick',
    type: new _graphql.GraphQLList(_graphql.GraphQLInt),
    args: {
      id_pick: {
        type: _graphql.GraphQLInt
      },
      id_owner: {
        type: _graphql.GraphQLInt
      },
      deadline: {
        type: _graphql.GraphQLString
      },
      order: {
        type: _graphql.GraphQLInt
      }
    },
    resolve: function resolve(root, _ref6) {
      var id_pick = _ref6.id_pick,
          id_owner = _ref6.id_owner,
          deadline = _ref6.deadline,
          order = _ref6.order;
      return _setup.Pick.update({
        id_owner: id_owner,
        deadline: deadline,
        order: order
      }, {
        where: {
          id_pick: id_pick
        }
      });
    }
  },
  draftPlayer: {
    description: 'Returns drafted player',
    type: _player["default"],
    args: {
      id_draft: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt)
      },
      id_pick: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt)
      },
      id_league: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt)
      },
      id_sl: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt)
      },
      id_player: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt)
      }
    },
    resolve: function resolve(root, _ref7) {
      var id_draft = _ref7.id_draft,
          id_league = _ref7.id_league,
          id_pick = _ref7.id_pick,
          id_sl = _ref7.id_sl,
          id_player = _ref7.id_player;

      var draft = _draft["default"].findOne({
        where: {
          id_draft: id_draft
        }
      });

      var player = _setup.Player.findOne({
        where: {
          id_player: id_player
        }
      });

      var unusedPicks = _setup.Pick.findAll({
        where: {
          id_draft: id_draft,
          is_used: false,
          deadline: {
            $gte: new Date()
          }
        }
      });

      var teamPlayer = _setup.TeamPlayer.findOne({
        where: {
          id_player: id_player
        },
        include: [{
          model: _teamSl["default"],
          foreignKey: 'id_sl',
          include: [{
            model: _setup.Division,
            foreignKey: 'id_division',
            include: [{
              model: _setup.Conference,
              foreignKey: 'id_conference',
              where: {
                id_league: id_league
              }
            }]
          }]
        }]
      });

      return Promise.all([draft, teamPlayer, unusedPicks, player]).then(function (results) {
        var draft = results[0];
        var teamPlayer = results[1];
        var unusedPicks = results[2];
        var player = results[3];

        if (draft.status_draft !== _draftStatus["default"].parseValue('STATUS_OPEN')) {
          return null;
        }

        if (teamPlayer) {
          return null;
        }

        if (!unusedPicks || unusedPicks.length === 0) {
          return null;
        }

        var picks = unusedPicks.sort(orderPicks);
        var currentPick = picks[0];

        if (currentPick.id_pick !== id_pick) {
          return null;
        }

        if (currentPick.id_owner !== id_sl) {
          return null;
        }

        if (!player) {
          return null;
        }

        return _connection["default"].transaction(function (transaction) {
          var updatePick = _setup.Pick.update({
            id_player: id_player,
            is_used: true
          }, {
            where: {
              id_pick: id_pick
            },
            transaction: transaction
          });

          var recruitPlayer = _setup.TeamPlayer.create({
            id_sl: id_sl,
            id_player: id_player,
            primary_position: player.default_primary,
            secondary_position: player.default_secondary
          }, {
            transaction: transaction
          });

          return Promise.all([updatePick, recruitPlayer]).then(function () {
            return player;
          });
        });
      });
    }
  }
};
exports.DraftMutation = DraftMutation;

function orderPicks(a, b) {
  if (a.round < b.round || a.round === b.round && a.order < b.order) {
    return -1;
  }

  if (a.round === b.round && a.order === b.order) {
    return 0;
  }

  return 1;
}