import {PlayerPerformance} from '../../model/setup';
import PlayerType from './player';
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

const PlayerPerformanceType = new GraphQLObjectType({
  name: 'PlayerPerformance',
  fields: () => ({

    id_player_performance : { type : GraphQLInt },
    id_player : { type : GraphQLInt },
    id_round : { type : GraphQLInt },
    minutes : { type : GraphQLInt },
    field_goal_attempts : { type : GraphQLInt },
    free_throw_attempts : { type : GraphQLInt },
    points : { type : GraphQLInt },
    defensive_rebounds : { type : GraphQLInt },
    offensive_rebounds : { type : GraphQLInt },
    assists : { type : GraphQLInt },
    steals : { type : GraphQLInt },
    blocks : { type : GraphQLInt },
    turnovers : { type : GraphQLInt },
    personal_fouls : { type : GraphQLInt },
    win_loss : { type : GraphQLInt },
    fantasy_points : { type : GraphQLFloat },

    player : {
      type : PlayerType,
      resolve : resolver(PlayerPerformance.Player)
    },
    round : {
      type : RoundType,
      resolve : resolver(PlayerPerformance.Round),
      args: {
        id_season: {
          name: 'id_season',
          type: GraphQLInt
        }
      }
    }
  })
});

export default PlayerPerformanceType;
