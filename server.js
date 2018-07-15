import express from 'express';
import graphqlHTTP from 'express-graphql';
import Sequelize from 'sequelize';
import graphqlSequelize from 'graphql-sequelize';
import Conn from './database/connection';
import PublicQuery from './graphql/query/public';
import CombinedQuery from './graphql/query/combined';
import RootMutationType from './graphql/mutation/root';

const graphql = require('graphql');
const resolver = graphqlSequelize.resolver;

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
  GraphQLString,
  GraphQLInt,
  GraphQLEnumType,
  GraphQLInterfaceType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType

} =  graphql;

const Schema = new GraphQLSchema({
  query: CombinedQuery,
  mutation: RootMutationType
});

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: Schema,
  graphiql: true,
}));

const server = app.listen(4000);
server.setTimeout(10 * 60 * 1000); // 10 minutes timeout
console.log('Running a GraphQL API server at localhost:4000/graphql');
