"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pick = _interopRequireDefault(require("./pick"));

var _league = _interopRequireDefault(require("./league"));

var _setup = require("../../model/setup");

var _player = _interopRequireDefault(require("./player"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList;
var DraftType = new GraphQLObjectType({
  name: 'Draft',
  fields: function fields() {
    return {
      id_draft: {
        type: GraphQLInt
      },
      id_season: {
        type: GraphQLInt
      },
      id_league: {
        type: GraphQLInt
      },
      year_draft: {
        type: GraphQLInt
      },
      status_draft: {
        type: GraphQLInt
      },
      draft_type: {
        type: GraphQLInt
      },
      picks: {
        type: new GraphQLList(_pick["default"]),
        resolve: resolver(_setup.Draft.Picks)
      },
      season: {
        type: _pick["default"],
        resolve: resolver(_setup.Draft.Season)
      },
      league: {
        type: _league["default"],
        resolve: resolver(_setup.Draft.League)
      },
      available_players: {
        type: new GraphQLList(_player["default"]),
        resolve: _setup.Draft.AvailablePlayers
      }
    };
  }
});
var _default = DraftType;
exports["default"] = _default;