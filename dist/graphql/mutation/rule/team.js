'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _player = require('../../object-types/player');

var _player2 = _interopRequireDefault(_player);

var _setup = require('../../../model/setup');

var _teamSl = require('../../../model/team-sl');

var _teamSl2 = _interopRequireDefault(_teamSl);

var _conference = require('../../../model/conference');

var _conference2 = _interopRequireDefault(_conference);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql');

var GraphQLList = graphql.GraphQLList,
    GraphQLInputObjectType = graphql.GraphQLInputObjectType,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLString = graphql.GraphQLString,
    GraphQLBoolean = graphql.GraphQLBoolean,
    GraphQLNonNull = graphql.GraphQLNonNull;


var input = new GraphQLInputObjectType({
  name: 'TeamInfoInput',
  fields: function fields() {
    return {
      id_sl: { type: new GraphQLNonNull(GraphQLInt) },
      id_player: { type: new GraphQLNonNull(GraphQLInt) },
      primary_position: { type: GraphQLString },
      secondary_position: { type: GraphQLString },
      order: { type: GraphQLInt }
    };
  }
});

var TeamMutation = {
  swapPosition: {
    description: 'Returns [update_count]',
    type: new GraphQLList(GraphQLInt),
    args: {
      team_info: { type: input }
    },
    resolve: function resolve(root, _ref) {
      var team_info = _ref.team_info;
      return _setup.TeamPlayer.findOne({
        where: team_info
      }).then(function (teamInfo) {
        return teamInfo && _setup.TeamPlayer.update({
          primary_position: teamInfo.secondary_position,
          secondary_position: teamInfo.primary_position
        }, { where: team_info });
      });
    }
  },
  dumpPlayer: {
    description: 'Returns delete_count',
    type: GraphQLInt,
    args: {
      team_info: { type: input }
    },
    resolve: function resolve(root, _ref2) {
      var team_info = _ref2.team_info;


      _setup.FreeAgencyHistory.create({
        action: 'DROP',
        id_sl: team_info.id_sl,
        event_date: Date.now(),
        id_player: team_info.id_player
      });

      return _setup.TeamPlayer.destroy({
        where: team_info
      });
    }
  },
  saveRoster: {
    description: 'Returns',
    type: GraphQLBoolean,
    args: {
      roster: { type: new GraphQLList(input) }
    },
    resolve: function resolve(root, _ref3) {
      var roster = _ref3.roster;

      var promises = roster.map(function (teamPlayer) {
        return _setup.TeamPlayer.update({
          primary_position: teamPlayer.primary_position,
          secondary_position: teamPlayer.secondary_position,
          order: teamPlayer.order
        }, { where: {
            id_player: teamPlayer.id_player,
            id_sl: teamPlayer.id_sl
          } });
      });

      return Promise.all(promises).then(function (results) {
        return results && results.length > 0;
      });
    }
  },
  recruitPlayer: {
    description: 'Returns player',
    type: _player2.default,
    args: {
      team_info: { type: input },
      id_league: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: function resolve(root, _ref4) {
      var team_info = _ref4.team_info,
          id_league = _ref4.id_league;
      return _setup.TeamPlayer.findOne({
        where: { id_player: team_info.id_player },
        include: [{
          model: _teamSl2.default,
          foreignKey: 'id_sl',
          include: [{
            model: _setup.Division,
            foreignKey: 'id_division',
            include: [{
              model: _conference2.default,
              foreignKey: 'id_conference',
              where: { id_league: id_league }
            }]
          }]
        }]
      }).then(function (teamPlayer) {
        if (teamPlayer && teamPlayer.id_sl !== 0) return null;

        return _setup.Player.findOne({
          where: { id_player: team_info.id_player }
        });
      }).then(function (player) {
        if (!player) return null;

        _setup.FreeAgencyHistory.create({
          action: 'PICK',
          event_date: Date.now(),
          id_sl: team_info.id_sl,
          id_player: player.id_player
        });

        _setup.TeamPlayer.create({
          id_sl: team_info.id_sl,
          id_player: player.id_player,
          primary_position: player.default_primary,
          secondary_position: player.default_secondary
        });

        return player;
      });
    }
  }
};

exports.default = TeamMutation;