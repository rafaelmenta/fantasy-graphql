import UserType from './user';
import PlayerType from './player';
import DivisionType from './division';
import TeamSeasonType from './team-season';
import {TeamSl} from '../../model/setup';


const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList
} =  graphql;

const TeamSlType = new GraphQLObjectType({
  name: 'TeamSl',
  fields: () => ({
    id_sl: { type: GraphQLInt },
    city: { type: GraphQLString },
    nickname: { type: GraphQLString },
    slug: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve: resolver(TeamSl.Users)
    },
    players: {
      type: new GraphQLList(PlayerType),
      resolve: resolver(TeamSl.Players)
    },
    division: {
      type: DivisionType,
      resolve: resolver(TeamSl.Division)
    },
    record: {
      type: TeamSeasonType,
      resolve : resolver(TeamSl.Record),
      args: {
        id_season : { type: new GraphQLNonNull(GraphQLInt) }
      }
    },
    records: {
      type: new GraphQLList(TeamSeasonType),
      resolve : resolver(TeamSl.Records),
      args: {
        id_season : { type : new GraphQLList(GraphQLInt) }
      }
    }
  })
});

export default TeamSlType;
