import UserMutation from './rule/user';
import TeamMutation from './rule/team';

const graphql = require('graphql');

const {
  GraphQLObjectType
} =  graphql;

var RootMutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: () => (Object.assign({},
    UserMutation,
    TeamMutation
  ))
});

export default RootMutationType;
