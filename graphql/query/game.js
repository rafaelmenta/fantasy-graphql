import GameType from '../object-types/game';
import {Game} from '../../model/setup';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} =  graphql;


const GameQuery = {
  games: {
   type: new GraphQLList(GameType),
    resolve: resolver(Game)
  }
};

export default GameQuery;
