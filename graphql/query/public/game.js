import GameType from '../../object-types/game';

import GameTypeEnum from '../../object-types/enum/game-type';
// import Game from '../../../model/game';
import { TeamSl, Division, Round, Game } from '../../../model/setup';
import Conference from '../../../model/conference';
import Season from '../../../model/season';
import Sequelize from 'sequelize';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} =  graphql;


const teamMap = {};

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
  },
  game: {
    type: GameType,
    resolve: resolver(Game),
    args: {
      id_game: {
        name: 'id_game',
        type: new GraphQLNonNull(GraphQLInt)
      }
    }
  },
  league_games: {
    type: new GraphQLList(GameType),
    args: {
      id_league: {
        name: 'id_league',
        type: new GraphQLNonNull(GraphQLInt)
      }
    },
    resolve: (root, {id_league}) => Game.findAll({
      include: [
        {model: Round, include: [{model: Season, where: {current: true}}]},
        Game.HomeTeam,
        Game.AwayTeam,
      ],
      where: {
        id_type: [GameTypeEnum.parseValue('LEAGUE'), GameTypeEnum.parseValue('PLAYOFF')],
        id_league: Sequelize.where(Sequelize.col('home.league_id'), id_league),
      }
    }),
  }
};

export default GameQuery;
