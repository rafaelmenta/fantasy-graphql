import UserQuery from './private/user';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLObjectType,
} = graphql;

const Query = new GraphQLObjectType({
  name: 'PrivateQuery',
  fields: () => (Object.assign({},
    UserQuery,
  ))
});

export default Query;
