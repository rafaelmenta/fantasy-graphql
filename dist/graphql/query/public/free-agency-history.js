"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _freeAgencyHistory = _interopRequireDefault(require("../../object-types/free-agency-history"));

var _setup = require("../../../model/setup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLNonNull = graphql.GraphQLNonNull;
var DEFAULT_LIMIT = 20;
var FreeAgencyHistoryQuery = {
  free_agency_history: {
    type: new GraphQLList(_freeAgencyHistory["default"]),
    resolve: _setup.FreeAgencyHistory.ByLeague,
    args: {
      id_league: {
        name: 'id_league',
        type: new GraphQLNonNull(GraphQLInt)
      },
      limit: {
        name: 'limit',
        type: GraphQLInt,
        defaultValue: DEFAULT_LIMIT
      }
    }
  }
};
var _default = FreeAgencyHistoryQuery;
exports["default"] = _default;