import PlayerType from './player';
import TeamSlType from './team-sl';
import {FreeAgencyHistory} from '../../model/setup';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList
} =  graphql;

const FreeAgencyHistoryType = new GraphQLObjectType({
  name: 'FreeAgencyHistory',
  fields: () => ({
    fah_code: { type: GraphQLInt },
    event_date: { type: GraphQLString },
    action : { type: GraphQLString },
    id_player : { type: GraphQLInt },
    id_sl : { type: GraphQLInt },
    player: {
      type: PlayerType,
      resolve: resolver(FreeAgencyHistory.Player)
    },
    team_sl: {
      type: TeamSlType,
      resolve: resolver(FreeAgencyHistory.TeamSl)
    }
  })
});

export default FreeAgencyHistoryType;
