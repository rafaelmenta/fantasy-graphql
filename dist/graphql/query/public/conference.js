"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _conference = _interopRequireDefault(require("../../object-types/conference"));

var _setup = require("../../../model/setup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLNonNull = graphql.GraphQLNonNull;
var ConferenceQuery = {
  conferences: {
    type: new GraphQLList(_conference["default"]),
    resolve: resolver(_setup.Conference)
  }
};
var _default = ConferenceQuery;
exports["default"] = _default;