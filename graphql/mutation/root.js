import UserMutation from './rule/user';
import TeamMutation from './rule/team';
import TradeMutation from './rule/trade';
import { DraftMutation } from './rule/draft';

const graphql = require('graphql');

const {
  GraphQLObjectType
} =  graphql;

var RootMutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: () => (Object.assign({},
    UserMutation,
    TeamMutation,
    TradeMutation,
    DraftMutation,
  )),
});

export default RootMutationType;
