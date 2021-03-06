import TeamSlType from './team-sl';
import DivisionType from './division';
import LeagueType from './league';
import { Conference, Division } from '../../model/setup';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} =  graphql;

const ConferenceType = new GraphQLObjectType({
  name: 'Conference',
  fields: () => ({
    id_conference: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
    },
    symbol: {
      type: GraphQLString,
    }
    ,
    divisions: {
      type: new GraphQLList(DivisionType),
      resolve: resolver(Conference.Divisions)
    },
    teams: {
      type: new GraphQLList(TeamSlType),
      resolve: Conference.Teams
    },
    league: {
      type: LeagueType,
      resolve: resolver(Conference.League)
    }
  })
});

export default ConferenceType;