import UserQuery from './user-query';
import TeamSlQuery from './team-sl-query';
import TeamNbaQuery from './team-nba';
import PlayerQuery from './player';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLObjectType,
} = graphql;

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => (Object.assign({},
    UserQuery,
    TeamSlQuery,
    TeamNbaQuery,
    PlayerQuery
  ))
});

export default Query;