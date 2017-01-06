import TeamSlType from './team-sl';
import ConferenceType from './conference';
import {Division} from '../../model/setup';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} =  graphql;

const DivisionType = new GraphQLObjectType({
  name: 'Division',
  fields: () => ({
    id_division: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
    },
    symbol: {
      type: GraphQLString,
    },
    teams: {
      type: new GraphQLList(TeamSlType),
      resolve: resolver(Division.Teams)
    },
    conference: {
      type: ConferenceType,
      resolve: resolver(Division.Conference)
    }
  })
});

export default DivisionType;