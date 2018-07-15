'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _graphqlSequelize = require('graphql-sequelize');

var _graphqlSequelize2 = _interopRequireDefault(_graphqlSequelize);

var _connection = require('./database/connection');

var _connection2 = _interopRequireDefault(_connection);

var _public = require('./graphql/query/public');

var _public2 = _interopRequireDefault(_public);

var _combined = require('./graphql/query/combined');

var _combined2 = _interopRequireDefault(_combined);

var _root = require('./graphql/mutation/root');

var _root2 = _interopRequireDefault(_root);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var graphql = require('graphql');
var resolver = _graphqlSequelize2.default.resolver;

_connection2.default.authenticate().then(function (err) {
  console.log('Connection has been established successfully.');
}).catch(function (err) {
  console.log('Unable to connect to the database:', err);
});

var GraphQLSchema = graphql.GraphQLSchema,
    GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLEnumType = graphql.GraphQLEnumType,
    GraphQLInterfaceType = graphql.GraphQLInterfaceType,
    GraphQLList = graphql.GraphQLList,
    GraphQLNonNull = graphql.GraphQLNonNull,
    GraphQLInputObjectType = graphql.GraphQLInputObjectType;


var Schema = new GraphQLSchema({
  query: _combined2.default,
  mutation: _root2.default
});

var app = (0, _express2.default)();
app.use('/graphql', (0, _expressGraphql2.default)({
  schema: Schema,
  graphiql: true
}));

var server = app.listen(4000);
server.setTimeout(10 * 60 * 1000); // 10 minutes timeout
console.log('Running a GraphQL API server at localhost:4000/graphql');