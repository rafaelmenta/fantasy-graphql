"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _trade = _interopRequireDefault(require("../../object-types/trade"));

var _setup = require("../../../model/setup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var graphql = require('graphql'),
    resolver = require('graphql-sequelize').resolver;

var GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLNonNull = graphql.GraphQLNonNull;
var TradeQuery = {
  trade: {
    type: _trade["default"],
    resolve: resolver(_setup.Trade),
    args: {
      id_trade: {
        name: 'id_trade',
        type: new GraphQLNonNull(GraphQLInt)
      }
    }
  },
  trades: {
    type: new GraphQLList(_trade["default"]),
    resolve: resolver(_setup.Trade),
    args: {
      id_sender: {
        name: 'id_sender',
        type: GraphQLInt
      },
      id_receiver: {
        name: 'id_receiver',
        type: GraphQLInt
      },
      status_trade: {
        name: 'status_trade',
        type: GraphQLInt
      }
    }
  }
};
var _default = TradeQuery;
exports["default"] = _default;