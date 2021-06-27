"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _draft = _interopRequireDefault(require("./draft"));

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
var PickType = new GraphQLObjectType({
  name: 'Pick',
  fields: function fields() {
    return {
      id_pick: {
        type: GraphQLInt
      },
      id_sl_original: {
        type: GraphQLInt
      },
      id_owner: {
        type: GraphQLInt
      },
      id_draft: {
        type: GraphQLInt
      },
      round: {
        type: GraphQLInt
      },
      order: {
        type: GraphQLInt
      },
      deadline: {
        type: GraphQLString
      },
      is_used: {
        type: GraphQLBoolean
      },
      id_player: {
        type: GraphQLInt
      },
      draft: {
        type: _draft["default"],
        resolve: resolver(_setup.Pick.Draft)
      },
      owner: {
        type: _teamSl["default"],
        resolve: resolver(_setup.Pick.Owner)
      },
      original: {
        type: _teamSl["default"],
        resolve: resolver(_setup.Pick.Original)
      }
    };
  }
});
var _default = PickType;
exports["default"] = _default;