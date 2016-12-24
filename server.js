import Query from './graphql/query/query';

var graphql = require('graphql');
var express = require('express');
var graphqlHTTP = require('express-graphql');
var Sequelize = require('sequelize');
var resolver = require('graphql-sequelize').resolver,
    Conn = require('./database/connection')



Conn
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInt
} =  graphql;

const client = graphql.graphql;

// UserTeam.sync().then(function() {
//   return UserTeam.findAll();
// })
//   .then(function(data) {
//   console.log('data is', data);
// })

// User.Teams = User.hasMany(UserTeam, { foreignKey : 'id_user'});

const Schema = new GraphQLSchema({
  query: Query
});

// client(Schema, '{user(id_user:19){login},}').then(console.log);

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: Schema,
  // rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
