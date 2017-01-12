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
    minutes : { type : GraphQLFloat },
    field_goal_attempts : { type : GraphQLFloat },
    free_throw_attempts : { type : GraphQLFloat },
    points : { type : GraphQLFloat },
    defensive_rebounds : { type : GraphQLFloat },
    offensive_rebounds : { type : GraphQLFloat },
    assists : { type : GraphQLFloat },
    steals : { type : GraphQLFloat },
    blocks : { type : GraphQLFloat },
    turnovers : { type : GraphQLFloat },
    personal_fouls : { type : GraphQLFloat },
    fantasy_points : { type : GraphQLFloat },

    games :{
      type: GraphQLInt,
      resolve: PlayerStats.GamesPlayed
    },

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
