"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _player = _interopRequireDefault(require("./player"));

var _teamSl = _interopRequireDefault(require("./team-sl"));

var _setup = require("../../model/setup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLBoolean = graphql.GraphQLBoolean,
    GraphQLList = graphql.GraphQLList;
var FreeAgencyHistoryType = new GraphQLObjectType({
  name: 'FreeAgencyHistory',
  fields: function fields() {
    return {
      fah_code: {
        type: GraphQLInt
      },
      event_date: {
        type: GraphQLString
      },
      action: {
        type: GraphQLString
      },
      id_player: {
        type: GraphQLInt
      },
      id_sl: {
        type: GraphQLInt
      },
      player: {
        type: _player["default"],
        resolve: resolver(_setup.FreeAgencyHistory.Player)
      },
      team_sl: {
        type: _teamSl["default"],
        resolve: resolver(_setup.FreeAgencyHistory.TeamSl)
      }
    };
  }
});
var _default = FreeAgencyHistoryType;
exports["default"] = _default;