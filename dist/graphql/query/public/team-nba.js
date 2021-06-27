"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _teamNba = _interopRequireDefault(require("../../object-types/team-nba"));

var _setup = require("../../../model/setup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLString = graphql.GraphQLString,
    GraphQLNonNull = graphql.GraphQLNonNull;
var TeamNbaQuery = {
  teams_nba: {
    type: new GraphQLList(_teamNba["default"]),
    resolve: resolver(_setup.TeamNba)
  },
  team_nba: {
    type: _teamNba["default"],
    resolve: resolver(_setup.TeamNba),
    args: {
      slug: {
        name: 'slug',
        type: GraphQLString
      }
    }
  }
};
var _default = TeamNbaQuery;
exports["default"] = _default;