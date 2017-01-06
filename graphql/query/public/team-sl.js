import TeamSlType from '../../object-types/team-sl';
import {TeamSl} from '../../../model/setup';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} =  graphql;


const TeamSLQuery = {
  team: {
    type: TeamSlType,
    resolve: resolver(TeamSl),
    args: {
      id_sl: {
        name: 'id_sl',
        type: new GraphQLNonNull(GraphQLInt) 
      }
    }
  },
  teams: {
    type: new GraphQLList(TeamSlType),
    resolve: resolver(TeamSl),
    args: {
      id_sl: {
        name: 'id_sl',
        type: new GraphQLList(GraphQLInt) 
      }
    }
  },
};

export default TeamSLQuery;
