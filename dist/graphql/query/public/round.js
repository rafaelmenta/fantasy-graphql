"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _round = _interopRequireDefault(require("../../object-types/round"));

var _setup = require("../../../model/setup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLNonNull = graphql.GraphQLNonNull;
var RoundQuery = {
  round: {
    type: _round["default"],
    resolve: resolver(_setup.Round),
    args: {
      id_round: {
        name: 'id_round',
        type: new GraphQLNonNull(GraphQLInt)
      }
    }
  },
  rounds: {
    type: new GraphQLList(_round["default"]),
    resolve: resolver(_setup.Round),
    args: {
      id_season: {
        name: 'id_season',
        type: new GraphQLList(GraphQLInt)
      }
    }
  }
};
var _default = RoundQuery;
exports["default"] = _default;