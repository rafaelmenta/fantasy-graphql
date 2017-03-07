import UserMutation from './rule/user';

const graphql = require('graphql');

const {
  GraphQLObjectType
} =  graphql;

var RootMutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: () => (Object.assign({},
    UserMutation
  ))
});

export default RootMutationType;
