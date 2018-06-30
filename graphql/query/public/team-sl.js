import TeamSlType from '../../object-types/team-sl';
import {TeamSl} from '../../../model/setup';
import { ManualTeamOverviewQuery } from '../../object-types/manual/team-overview';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} =  graphql;


const TeamSLQuery = {
  team: {
    type: TeamSlType,
    resolve: resolver(TeamSl),
    args: {
      id_sl: {
        name: 'id_sl',
        type: GraphQLInt
      },
      slug: {
        name: 'slug',
        type: GraphQLString
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
  team_overview: ManualTeamOverviewQuery,
};

export default TeamSLQuery;
