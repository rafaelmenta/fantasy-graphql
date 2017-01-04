import TeamStatsType from '../object-types/team-stats';
import {TeamStats} from '../../model/setup';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} =  graphql;

const TeamStatsQuery = {
  team_averages : {
    type: new GraphQLList(TeamStatsType),
    resolve: resolver(TeamStats),
    args: {
      id_sl: {
        name : 'id_sl',
        type : new GraphQLNonNull(GraphQLInt)
      }
    }
  },
  team_season_averages : {
    type: new GraphQLList(TeamStatsType),
    resolve: resolver(TeamStats),
    args: {
      id_season: {
        name : 'id_season',
        type : new GraphQLNonNull(GraphQLInt)
      }
    }
  },
  general_averages: {
    type: new GraphQLList(TeamStatsType),
    resolve: resolver(TeamStats),
    args : {
      id_season : {
        name : 'id_season',
        type : new GraphQLList(GraphQLInt)
      },
      id_sl : {
        name : 'id_sl',
        type : new GraphQLList(GraphQLInt)
      }
    }
  }
}

export default TeamStatsQuery;
