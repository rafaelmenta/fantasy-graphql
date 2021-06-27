'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LeagueMutation = void 0;

var _graphql = require("graphql");

var _league = _interopRequireDefault(require("../../object-types/league"));

var _connection = _interopRequireDefault(require("../../../database/connection"));

var _league2 = _interopRequireDefault(require("../../../model/league"));

var _leagueConfig = _interopRequireDefault(require("../../../model/associations/league-config"));

var _conference = _interopRequireDefault(require("../../object-types/conference"));

var _setup = require("../../../model/setup");

var _leagueConfig2 = _interopRequireDefault(require("../../object-types/league-config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var leagueInfoInput = new _graphql.GraphQLInputObjectType({
  name: 'LeagueInfoInput',
  fields: function fields() {
    return {
      id_league: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt)
      },
      name: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      },
      symbol: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      },
      number_of_teams: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt)
      }
    };
  }
});
var divisionInfoInput = new _graphql.GraphQLInputObjectType({
  name: 'DivisionInfoInput',
  fields: function fields() {
    return {
      id_division: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt)
      },
      name: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      },
      symbol: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      }
    };
  }
});
var conferenceInfoInput = new _graphql.GraphQLInputObjectType({
  name: 'ConferenceInfoInput',
  fields: function fields() {
    return {
      id_conference: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt)
      },
      name: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      },
      symbol: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      },
      divisions: {
        type: new _graphql.GraphQLNonNull(new _graphql.GraphQLList(divisionInfoInput))
      }
    };
  }
});
var configInput = new _graphql.GraphQLInputObjectType({
  name: 'ConfigInput',
  fields: function fields() {
    return {
      id_config: {
        type: _graphql.GraphQLString
      },
      config_value: {
        type: _graphql.GraphQLString
      }
    };
  }
});
var LeagueMutation = {
  saveLeague: {
    description: 'Save league information',
    type: new _graphql.GraphQLList(_graphql.GraphQLInt),
    args: {
      league: {
        type: leagueInfoInput
      }
    },
    resolve: function resolve(root, _ref) {
      var league = _ref.league;
      return _league2["default"].update({
        name: league.name,
        symbol: league.symbol,
        number_of_teams: league.number_of_teams
      }, {
        where: {
          id_league: league.id_league
        }
      });
    }
  },
  saveConference: {
    description: 'Save conference information',
    type: new _graphql.GraphQLList(_graphql.GraphQLInt),
    args: {
      conference: {
        type: conferenceInfoInput
      }
    },
    resolve: function resolve(root, _ref2) {
      var conference = _ref2.conference;
      return _connection["default"].transaction(function (t) {
        var divisionUpdates = conference.divisions.map(function (division) {
          return _setup.Division.update({
            name: division.name,
            symbol: division.symbol
          }, {
            where: {
              id_division: division.id_division
            },
            transaction: t
          });
        });

        var conferenceUpdate = _setup.Conference.update({
          name: conference.name,
          symbol: conference.symbol
        }, {
          where: {
            id_conference: conference.id_conference
          },
          transaction: t
        });

        return Promise.all([conferenceUpdate].concat(_toConsumableArray(divisionUpdates))).then(function (results) {
          return results[0];
        });
      });
    }
  },
  saveConfigs: {
    description: 'Save league conferences',
    type: new _graphql.GraphQLList(new _graphql.GraphQLList(_graphql.GraphQLInt)),
    args: {
      id_league: {
        type: _graphql.GraphQLInt
      },
      configs: {
        type: new _graphql.GraphQLList(configInput)
      }
    },
    resolve: function resolve(root, _ref3) {
      var id_league = _ref3.id_league,
          configs = _ref3.configs;
      var configUpdates = configs.map(function (config) {
        return _leagueConfig["default"].update({
          config_value: config.config_value
        }, {
          where: {
            id_config: config.id_config,
            id_league: id_league
          }
        });
      });
      return Promise.all(configUpdates);
    }
  }
};
exports.LeagueMutation = LeagueMutation;