import {TeamPerformance} from '../../model/setup';
import TeamSlType from './team-sl';
import RoundType from './round';

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

const TeamPerformanceType = new GraphQLObjectType({
  name: 'TeamPerformance',
  fields: () => ({

    tpf_code : { type : GraphQLInt },
    minutes_pg : { type : GraphQLInt },
    minutes_sg : { type : GraphQLInt },
    minutes_sf : { type : GraphQLInt },
    minutes_pf : { type : GraphQLInt },
    minutes_c : { type : GraphQLInt },
    fantasy_points : { type : GraphQLFloat },

    team_sl : {
      type : TeamSlType,
      resolve : resolver(TeamPerformance.Team)
    },
    round : {
      type : RoundType,
      resolve : resolver(TeamPerformance.Round)
    }
  })
});

export default TeamPerformanceType;
