import TeamPerformanceType from '../../object-types/team-performance';
import {TeamPerformance} from '../../../model/setup';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} =  graphql;

const TeamPerformanceQuery = {
  team_performance: {
    type: TeamPerformanceType,
    resolve: resolver(TeamPerformance),
    args: {
      id_player_performance: {
        name : 'tpf_code',
        type : new GraphQLNonNull(GraphQLInt)
      }
    }
  },
  team_performances: {
    type: new GraphQLList(TeamPerformanceType),
    resolve: resolver(TeamPerformance),
    args : {
      id_round : {
        name : 'id_round',
        type : new GraphQLList(GraphQLInt)
      },
      id_sl : {
        name : 'id_sl',
        type : new GraphQLList(GraphQLInt)
      }
    }
  }
}

export default TeamPerformanceQuery;
