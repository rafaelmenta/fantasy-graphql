import RoundType from './round';
import {Season} from '../../model/setup';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList
} =  graphql;

const SeasonType = new GraphQLObjectType({
  name: 'Season',
  fields: () => ({
    id_season: {
      type: GraphQLInt,
    },
    year: {
      type: GraphQLString,
    },
    current : {
      type : GraphQLBoolean
    },
    rounds: {
      type: new GraphQLList(RoundType),
      resolve: resolver(Season.Rounds)
    }
  })
});

export default SeasonType;