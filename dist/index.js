"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeQuery = void 0;

var _connection = _interopRequireDefault(require("./database/connection"));

var _public = _interopRequireDefault(require("./graphql/query/public"));

var _private = _interopRequireDefault(require("./graphql/query/private"));

var _root = _interopRequireDefault(require("./graphql/mutation/root"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var graphql = require('graphql');

var GraphQLSchema = graphql.GraphQLSchema;
var PublicSchema = new GraphQLSchema({
  query: _public["default"],
  mutation: _root["default"]
});
var PrivateSchema = new GraphQLSchema({
  query: _private["default"],
  mutation: _root["default"]
});
var client = graphql.graphql;

var makeQuery = function makeQuery(query, variables, privateSchema) {
  var schema = privateSchema ? PrivateSchema : PublicSchema;
  return client(schema, query, null, null, variables);
};

exports.makeQuery = makeQuery;