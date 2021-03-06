import Conn from './database/connection';
import PublicQuery from './graphql/query/public';
import PrivateQuery from './graphql/query/private';
import RootMutationType from './graphql/mutation/root';

const graphql = require('graphql');

const {
  GraphQLSchema,
} =  graphql;

const PublicSchema = new GraphQLSchema({
  query: PublicQuery,
  mutation: RootMutationType
});

const PrivateSchema = new GraphQLSchema({
  query: PrivateQuery,
  mutation: RootMutationType
});

const client = graphql.graphql;

const makeQuery = function(query, variables, privateSchema) {
  const schema = privateSchema ? PrivateSchema : PublicSchema;
  return client(schema, query, null, null, variables);
}

export {
  makeQuery
};
