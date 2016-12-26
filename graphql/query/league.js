import LeagueType from '../object-types/league';
import {League} from '../../model/setup';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} =  graphql;


const LeagueQuery = {
  leagues: {
   type: new GraphQLList(LeagueType),
    resolve: resolver(League)
  }
};

export default LeagueQuery;
