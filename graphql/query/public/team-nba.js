import TeamNbaType from '../../object-types/team-nba';
import {TeamNba} from '../../../model/setup';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} =  graphql;


const TeamNbaQuery = {
  teams_nba: {
    type: new GraphQLList(TeamNbaType),
    resolve: resolver(TeamNba)
  },
  team_nba: {
    type: TeamNbaType,
    resolve: resolver(TeamNba),
    args: {
      slug: {
        name: 'slug',
        type: GraphQLString
      }
    }
  }
};

export default TeamNbaQuery;
