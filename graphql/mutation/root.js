import UserMutation from './rule/user';
import TeamMutation from './rule/team';
import TradeMutation from './rule/trade';
import { DraftMutation } from './rule/draft';
import { LeagueMutation } from './rule/league';
import { GameMutation } from './rule/game';
import { PlayerMutation } from './rule/player';
import { GameNbaMutation } from './rule/game-nba';
import { TeamPerformanceMutation } from './rule/team.performance';

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
    PlayerMutation,
    GameNbaMutation,
    TeamPerformanceMutation,
  )),
});

export default RootMutationType;
