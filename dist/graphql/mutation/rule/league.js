'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LeagueMutation = undefined;

var _graphql = require('graphql');

var _league = require('../../object-types/league');

var _league2 = _interopRequireDefault(_league);

var _connection = require('../../../database/connection');

var _connection2 = _interopRequireDefault(_connection);

var _league3 = require('../../../model/league');

var _league4 = _interopRequireDefault(_league3);

var _leagueConfig = require('../../../model/associations/league-config');

var _leagueConfig2 = _interopRequireDefault(_leagueConfig);

var _conference = require('../../object-types/conference');

var _conference2 = _interopRequireDefault(_conference);

var _setup = require('../../../model/setup');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var leagueInfoInput = new _graphql.GraphQLInputObjectType({
  name: 'LeagueInfoInput',
  fields: function fields() {
    return {
      id_league: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) },
      name: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      symbol: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      number_of_teams: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) }
    };
  }
});

var divisionInfoInput = new _graphql.GraphQLInputObjectType({
  name: 'DivisionInfoInput',
  fields: function fields() {
    return {
      id_division: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) },
      name: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      symbol: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    };
  }
});

var conferenceInfoInput = new _graphql.GraphQLInputObjectType({
  name: 'ConferenceInfoInput',
  fields: function fields() {
    return {
      id_conference: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) },
      name: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      symbol: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      divisions: { type: new _graphql.GraphQLNonNull(new _graphql.GraphQLList(divisionInfoInput)) }
    };
  }
});

var LeagueMutation = exports.LeagueMutation = {
  saveLeague: {
    description: 'Save league information',
    type: new _graphql.GraphQLList(_graphql.GraphQLInt),
    args: {
      league: { type: leagueInfoInput }
    },
    resolve: function resolve(root, _ref) {
      var league = _ref.league;
      return _league4.default.update({
        name: league.name,
        symbol: league.symbol,
        number_of_teams: league.number_of_teams
      }, {
        where: { id_league: league.id_league }
      });
    }
  },
  saveConference: {
    description: 'Save conference information',
    type: new _graphql.GraphQLList(_graphql.GraphQLInt),
    args: {
      conference: { type: conferenceInfoInput }
    },
    resolve: function resolve(root, _ref2) {
      var conference = _ref2.conference;
      return _connection2.default.transaction(function (t) {

        var divisionUpdates = conference.divisions.map(function (division) {
          return _setup.Division.update({
            name: division.name,
            symbol: division.symbol
          }, {
            where: { id_division: division.id_division },
            transaction: t
          });
        });

        var conferenceUpdate = _setup.Conference.update({
          name: conference.name,
          symbol: conference.symbol
        }, {
          where: { id_conference: conference.id_conference },
          transaction: t
        });

        return Promise.all([conferenceUpdate].concat(_toConsumableArray(divisionUpdates))).then(function (results) {
          return results[0];
        });
      });
    }
  }
};