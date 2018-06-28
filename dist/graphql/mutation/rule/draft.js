'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DraftMutation = undefined;

var _player = require("../../object-types/player");

var _player2 = _interopRequireDefault(_player);

var _draft = require("../../../model/draft");

var _draft2 = _interopRequireDefault(_draft);

var _setup = require("../../../model/setup");

var _teamSl = require("../../../model/team-sl");

var _teamSl2 = _interopRequireDefault(_teamSl);

var _draftStatus = require("../../object-types/enum/draft-status");

var _draftStatus2 = _interopRequireDefault(_draftStatus);

var _connection = require("../../../database/connection");

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql');

var GraphQLNonNull = graphql.GraphQLNonNull,
    GraphQLInt = graphql.GraphQLInt;
var DraftMutation = exports.DraftMutation = {
  draftPlayer: {
    description: 'Returns drafted player',
    type: _player2.default,
    args: {
      id_draft: { type: new GraphQLNonNull(GraphQLInt) },
      id_pick: { type: new GraphQLNonNull(GraphQLInt) },
      id_league: { type: new GraphQLNonNull(GraphQLInt) },
      id_sl: { type: new GraphQLNonNull(GraphQLInt) },
      id_player: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: function resolve(root, _ref) {
      var id_draft = _ref.id_draft,
          id_league = _ref.id_league,
          id_pick = _ref.id_pick,
          id_sl = _ref.id_sl,
          id_player = _ref.id_player;

      var draft = _draft2.default.findOne({ where: { id_draft: id_draft } });
      var player = _setup.Player.findOne({ where: { id_player: id_player } });
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
        where: { id_player: id_player },
        include: [{
          model: _teamSl2.default,
          foreignKey: 'id_sl',
          include: [{
            model: _setup.Division,
            foreignKey: 'id_division',
            include: [{
              model: _setup.Conference,
              foreignKey: 'id_conference',
              where: { id_league: id_league }
            }]
          }]
        }]
      });

      return Promise.all([draft, teamPlayer, unusedPicks, player]).then(function (results) {
        var draft = results[0];
        var teamPlayer = results[1];
        var unusedPicks = results[2];
        var player = results[3];

        if (draft.status_draft !== _draftStatus2.default.parseValue('STATUS_OPEN')) {
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

        return _connection2.default.transaction(function (transaction) {
          var updatePick = _setup.Pick.update({
            id_player: id_player,
            is_used: true
          }, {
            where: { id_pick: id_pick },
            transaction: transaction
          });

          var recruitPlayer = _setup.TeamPlayer.create({
            id_sl: id_sl,
            id_player: id_player,
            primary_position: player.default_primary,
            secondary_position: player.default_secondary
          }, { transaction: transaction });

          return Promise.all([updatePick, recruitPlayer]).then(function () {
            return player;
          });
        });
      });
    }
  }
};

function orderPicks(a, b) {
  if (a.round < b.round || a.round === b.round && a.order < b.order) {
    return -1;
  }

  if (a.round === b.round && a.order === b.order) {
    return 0;
  }

  return 1;
}