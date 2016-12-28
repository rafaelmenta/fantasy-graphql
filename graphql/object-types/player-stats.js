import {PlayerStats} from '../../model/setup';
import PlayerType from './player';
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

const PlayerStatsType = new GraphQLObjectType({
  name: 'PlayerStats',
  fields: () => ({

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
    fantasy_points : { type : GraphQLFloat },
    
    player : {
      type : PlayerType,
      resolve : resolver(PlayerStats.Player)
    },
    season : {
      type : SeasonType,
      resolve : resolver(PlayerStats.Season)
    }
  })
});

export default PlayerStatsType;