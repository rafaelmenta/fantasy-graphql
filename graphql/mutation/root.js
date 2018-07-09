import UserMutation from './rule/user';
import TeamMutation from './rule/team';
import TradeMutation from './rule/trade';
import { DraftMutation } from './rule/draft';
import { LeagueMutation } from './rule/league';
import { GameMutation } from './rule/game';

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
    LeagueMutation,
    GameMutation,
  )),
});

export default RootMutationType;
