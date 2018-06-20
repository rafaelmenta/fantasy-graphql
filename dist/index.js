'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeQuery = undefined;

var _connection = require('./database/connection');

var _connection2 = _interopRequireDefault(_connection);

var _public = require('./graphql/query/public');

var _public2 = _interopRequireDefault(_public);

var _private = require('./graphql/query/private');

var _private2 = _interopRequireDefault(_private);

var _root = require('./graphql/mutation/root');

var _root2 = _interopRequireDefault(_root);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql');

var GraphQLSchema = graphql.GraphQLSchema;


var PublicSchema = new GraphQLSchema({
  query: _public2.default,
  mutation: _root2.default
});

var PrivateSchema = new GraphQLSchema({
  query: _private2.default,
  mutation: _root2.default
});

var client = graphql.graphql;

var makeQuery = function makeQuery(query, variables, privateSchema) {
  var schema = privateSchema ? PrivateSchema : PublicSchema;
  return client(schema, query, null, null, variables);
};

exports.makeQuery = makeQuery;