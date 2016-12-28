import GameNbaType from '../object-types/game-nba';
import {GameNba} from '../../model/setup';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} =  graphql;


const GameNbaQuery = {
  game_nba : {
    type : GameNbaType, 
    resolve : resolver(GameNba),
    args: {
      id_game_nba : {
        name : 'id_game_nba',
        type : new GraphQLNonNull(GraphQLInt)

      } 
    }
  },
  date_games_nba : {
    type : new GraphQLList(GameNbaType),
    resolve : GameNba.DateGames,
    args : {
      date : {
        description: 'Format YYYY/MM/DD',
        type : GraphQLString
      }
    }
  },
  games_nba: {
    type: new GraphQLList(GameNbaType),
    resolve: resolver(GameNba),
    args : {
      id_home : {
        name : 'id_home',
        type : new GraphQLList(GraphQLInt)
      },
      id_away : {
        name : 'id_away',
        type : new GraphQLList(GraphQLInt)
      }
    }
  }
};

export default GameNbaQuery;
