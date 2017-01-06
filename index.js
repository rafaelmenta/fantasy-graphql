import Conn from './database/connection';
import Query from './graphql/query/query';

const graphql = require('graphql');

const {
  GraphQLSchema,
} =  graphql;

const Schema = new GraphQLSchema({
  query: Query
});

const client = graphql.graphql;

export {
  client as GraphQl,
  Schema
};
