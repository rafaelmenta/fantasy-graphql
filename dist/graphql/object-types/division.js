"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _teamSl = _interopRequireDefault(require("./team-sl"));

var _conference = _interopRequireDefault(require("./conference"));

var _setup = require("../../model/setup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList;
var DivisionType = new GraphQLObjectType({
  name: 'Division',
  fields: function fields() {
    return {
      id_division: {
        type: GraphQLInt
      },
      name: {
        type: GraphQLString
      },
      symbol: {
        type: GraphQLString
      },
      teams: {
        type: new GraphQLList(_teamSl["default"]),
        resolve: resolver(_setup.Division.Teams)
      },
      conference: {
        type: _conference["default"],
        resolve: resolver(_setup.Division.Conference)
      }
    };
  }
});
var _default = DivisionType;
exports["default"] = _default;