import TeamNbaType from './team-nba';
import RoundType from './round';
import {GameNba} from '../../model/setup';
import GraphQLDate from 'graphql-date';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList
} =  graphql;

const GameNbaType = new GraphQLObjectType({
  name: 'GameNba',
  fields: () => ({
    id_game_nba: {
      type: GraphQLInt,
    },
    away_team: {
      type: TeamNbaType,
      resolve: resolver(GameNba.HomeTeam)
    },
    home_team: {
      type: TeamNbaType,
      resolve: resolver(GameNba.AwayTeam)
    },
    round_away: {
      type: RoundType,
      resolve: resolver(GameNba.AwayRound)
    },
    round_home: {
      type: RoundType,
      resolve: resolver(GameNba.HomeRound)
    },
    game_time : { type : GraphQLDate },
    is_finished : { type : GraphQLBoolean },
    external_id : { type : GraphQLString }
  })
});

export default GameNbaType;
