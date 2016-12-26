import TeamSlType from './team-sl';
import UserType from './user';
import ConferenceType from './conference';
import { League, Conference } from '../../model/Setup';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} =  graphql;

const LeagueType = new GraphQLObjectType({
  name: 'League',
  fields: () => ({
    id_conference: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
    },
    symbol: {
      type: GraphQLString,
    },
    number_of_teams: {
      type: GraphQLInt
    },
    owner: {
      type: UserType,
      resolve: resolver(League.Owner)
    },
    conferences: {
      type: new GraphQLList(ConferenceType),
      resolve: resolver(League.Conferences)
    },
    teams: {
      type: new GraphQLList(TeamSlType),
      resolve: League.Teams
    }
  })
});

export default LeagueType;