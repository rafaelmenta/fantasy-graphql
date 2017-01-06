import GameType from '../../object-types/game';
import {Game} from '../../../model/setup';

import GameTypeEnum from '../../object-types/enum/game-type';

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
    resolve: resolver(Game),
    args : {
      id_game : {
        name : 'id_game',
        type : new GraphQLList(GraphQLInt)
      },
      id_round : {
        name : 'id_round',
        type : new GraphQLList(GraphQLInt)
      },
      id_type : {
        name : 'id_type',
        type: new GraphQLList(GameTypeEnum)
      },
      home_team : {
        name : 'home_team',
        type : new GraphQLList(GraphQLInt)
      },
      away_team : {
        name : 'away_team',
        type : new GraphQLList(GraphQLInt)
      },
    }
  }
};

export default GameQuery;
