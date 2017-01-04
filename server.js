import express from 'express';
import graphqlHTTP from 'express-graphql';
import Sequelize from 'sequelize';
import graphqlSequelize from 'graphql-sequelize';
import Conn from './database/connection';
import Query from './graphql/query/query';

const graphql = require('graphql');
const resolver = graphqlSequelize.resolver;

// Conn
//   .authenticate()
//   .then(function(err) {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(function (err) {
//     console.log('Unable to connect to the database:', err);
//   });

const {
  GraphQLSchema,
} =  graphql;

const client = graphql.graphql;
const Schema = new GraphQLSchema({
  query: Query
});

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: Schema,
  // rootValue: root,
  graphiql: true,
}));

const env = app.get('env');
console.log('env is', env);

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
