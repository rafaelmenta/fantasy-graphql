import TeamSlType from '../object-types/team-sl';
import {TeamSl} from '../../model/setup';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} =  graphql;


const TeamSLQuery = {
  teams: {
   type: new GraphQLList(TeamSlType),
    resolve: resolver(TeamSl)
  }
};

export default TeamSLQuery;
