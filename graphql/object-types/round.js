import GameType from './game';
import PlayerPerformance from './player-performance';
import {Round} from '../../model/setup';
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

const RoundType = new GraphQLObjectType({
  name: 'Round',
  fields: () => ({
    id_round: {
      type: GraphQLInt,
    },
    description: {
      type: GraphQLString,
    },
    round_number: {
      type: GraphQLInt,
    },
    id_season : {
      type: GraphQLInt
    },
    open_date : {
      type: GraphQLDate
    },
    close_date : {
      type : GraphQLDate
    },
    processed : {
      type : GraphQLBoolean
    },
    opened : {
      type : GraphQLBoolean
    },
    games: {
      type: new GraphQLList(GameType),
      resolve: resolver(Round.Games)
    }
  })
});

export default RoundType;
