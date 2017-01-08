import Conn from './database/connection';
import PublicQuery from './graphql/query/public';
import PrivateQuery from './graphql/query/private';

const graphql = require('graphql');

const {
  GraphQLSchema,
} =  graphql;

const PublicSchema = new GraphQLSchema({
  query: PublicQuery
});

const PrivateSchema = new GraphQLSchema({
  query: PrivateQuery
});

const client = graphql.graphql;

const makeQuery = function(query, variables, privateSchema) {
  const schema = privateSchema ? PrivateSchema : PublicSchema;
  return client(schema, query, null, null, variables);
}

export {
  makeQuery
};
