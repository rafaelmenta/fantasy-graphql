"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _draft = _interopRequireDefault(require("../../object-types/draft"));

var _setup = require("../../../model/setup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLBoolean = graphql.GraphQLBoolean,
    GraphQLNonNull = graphql.GraphQLNonNull;
var PickQuery = {
  pick: {
    type: _draft["default"],
    resolve: resolver(_setup.Pick),
    args: {
      id_draft: {
        name: 'id_draft',
        type: new GraphQLNonNull(GraphQLInt)
      }
    }
  },
  picks: {
    type: new GraphQLList(_draft["default"]),
    resolve: resolver(_setup.Pick),
    args: {
      id_owner: {
        name: 'id_owner',
        type: GraphQLInt
      },
      id_draft: {
        name: 'id_draft',
        type: GraphQLInt
      },
      is_used: {
        name: 'is_used',
        type: GraphQLBoolean
      },
      round: {
        name: 'round',
        type: GraphQLInt
      }
    }
  }
};
var _default = PickQuery;
exports["default"] = _default;