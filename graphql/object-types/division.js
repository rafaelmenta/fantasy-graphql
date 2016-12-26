import TeamSlType from './team-sl';
import Division from '../../model/division';

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
    }
  })
});

export default DivisionType;