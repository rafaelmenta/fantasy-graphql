import LeagueType from '../../object-types/league';
import {League} from '../../../model/setup';

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
  },
  league: {
    type: LeagueType,
    resolve: resolver(League),
    args: {
      id_league: {
        type: new GraphQLNonNull(GraphQLInt),
        name: 'id_league'
      }
    }
  }
};

export default LeagueQuery;
