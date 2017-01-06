import TeamNbaType from '../../object-types/team-nba';
import {TeamNba} from '../../../model/setup';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} =  graphql;


const TeamNbaQuery = {
  teams_nba: {
   type: new GraphQLList(TeamNbaType),
    resolve: resolver(TeamNba)
  }
};

export default TeamNbaQuery;
