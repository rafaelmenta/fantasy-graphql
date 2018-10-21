'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoundMutation = undefined;

var _graphql = require('graphql');

var _connection = require('../../../database/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function openRound(root, _ref) {
  var id_round = _ref.id_round;

  // 1 - Create player performance
  var createPlayerPerformance = '\n    INSERT INTO player_performance(id_player, id_round)\n    (SELECT id_player, ' + id_round + ' FROM player WHERE retired = false);\n  ';

  // 2 - Create team performance
  var createTeamPerformance = '\n    INSERT INTO team_performance(id_sl, id_round, minutes_pg, minutes_sg, minutes_sf, minutes_pf, minutes_c)\n    (SELECT id_sl, ' + id_round + ', 48, 48, 48, 48, 48 FROM team_sl);\n  ';

  // 3 - Create player team performance
  var createPlayerTeamPerformance = '\n    INSERT INTO player_team_performance(id_player, id_round, id_sl, `order`, primary_position, secondary_position)\n    (SELECT DISTINCT id_player, ' + id_round + ', id_sl, `order`, primary_position, secondary_position FROM team_player);\n  ';

  // 4 - Update round as opened
  var updateRound = '\n    UPDATE round SET opened = true WHERE id_round = ' + id_round + ';\n  ';

  return _connection2.default.transaction(function (t) {
    return _connection2.default.query(createPlayerPerformance, { transaction: t }).then(function () {
      return _connection2.default.query(createTeamPerformance, { transaction: t });
    }).then(function () {
      return _connection2.default.query(createPlayerTeamPerformance, { transaction: t });
    }).then(function () {
      return _connection2.default.query(updateRound, { transaction: t });
    }).then(function (results) {
      return results[0].affectedRows === 1;
    });
  });
}

var RoundMutation = exports.RoundMutation = {
  openRound: {
    description: 'Open a fantasy round',
    type: _graphql.GraphQLBoolean,
    args: {
      id_round: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) }
    },
    resolve: openRound
  }
};