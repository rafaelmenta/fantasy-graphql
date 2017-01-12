import {TeamStats} from '../../model/setup';
import TeamSlType from './team-sl';
import SeasonType from './season';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLList
} =  graphql;

const TeamStatsType = new GraphQLObjectType({
  name: 'TeamStats',
  fields: () => ({

    id_sl : { type : GraphQLInt },
    id_season : { type : GraphQLInt },
    minutes_pg : { type : GraphQLFloat },
    minutes_sg : { type : GraphQLFloat },
    minutes_sf : { type : GraphQLFloat },
    minutes_pf : { type : GraphQLFloat },
    minutes_c : { type : GraphQLFloat },
    fantasy_points : { type : GraphQLFloat },

    team_sl : {
      type : TeamSlType,
      resolve : resolver(TeamStats.TeamSl)
    },
    season : {
      type : SeasonType,
      resolve : resolver(TeamStats.Season)
    }
  })
});

export default TeamStatsType;
