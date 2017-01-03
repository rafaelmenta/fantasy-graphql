import TeamSlType from './team-sl';
import TeamPerformanceType from './team-performance';

import {Game} from '../../model/setup';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} =  graphql;

const GameType = new GraphQLObjectType({
  name: 'Game',
  fields: () => ({
    id_game: {
      type: GraphQLInt,
    },
    id_type: {
      type: GraphQLInt,
    },
    id_round: {
      type: GraphQLInt,
    },
    home_team: {
      type: TeamSlType,
      resolve: resolver(Game.HomeTeam)
    },
    away_team: {
      type: TeamSlType,
      resolve: resolver(Game.AwayTeam)
    },
    home_performance: {
      type: TeamPerformanceType,
      resolve: Game.HomePerformance
    },
    away_performance: {
      type: TeamPerformanceType,
      resolve: Game.AwayPerformance
    },
  })
});

export default GameType;
