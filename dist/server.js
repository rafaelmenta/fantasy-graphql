"use strict";

var _express = _interopRequireDefault(require("express"));

var _expressGraphql = _interopRequireDefault(require("express-graphql"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var _graphqlSequelize = _interopRequireDefault(require("graphql-sequelize"));

var _connection = _interopRequireDefault(require("./database/connection"));

var _public = _interopRequireDefault(require("./graphql/query/public"));

var _combined = _interopRequireDefault(require("./graphql/query/combined"));

var _root = _interopRequireDefault(require("./graphql/mutation/root"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var graphql = require('graphql');

var resolver = _graphqlSequelize["default"].resolver;

_connection["default"].authenticate().then(function (err) {
  console.log('Connection has been established successfully.');
})["catch"](function (err) {
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
  query: _combined["default"],
  mutation: _root["default"]
});
var app = (0, _express["default"])();
app.use('/graphql', (0, _expressGraphql["default"])({
  schema: Schema,
  graphiql: true
}));
var server = app.listen(4000);
server.setTimeout(10 * 60 * 1000); // 10 minutes timeout

console.log('Running a GraphQL API server at localhost:4000/graphql');