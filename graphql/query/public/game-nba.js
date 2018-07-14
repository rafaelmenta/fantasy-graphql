import GameNbaType from '../../object-types/game-nba';
import {GameNba} from '../../../model/setup';
import Conn from '../../../database/connection';
import { GraphQLInt, GraphQLList, GraphQLString, GraphQLNonNull } from 'graphql';
import { resolver } from 'graphql-sequelize';

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
  ranged_date_games_nba : {
    type : new GraphQLList(GameNbaType),
    resolve : GameNba.RangedDateGames,
    args : {
      start_date : {
        description: 'Format YYYY/MM/DD',
        type : GraphQLString
      },
      end_date : {
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
  },
  current_games_nba: {
    type: new GraphQLList(GameNbaType),
    resolve: () => Conn.query(`
      SELECT g.*,
        home_round.id_round as 'home_round.id_round',
        home_round.round_number as 'home_round.round_number',
        away_round.id_round as 'away_round.id_round',
        away_round.round_number as 'away_round.round_number',
        home.id_nba as 'home.id_nba',
        home.city as 'home.city',
        home.nickname as 'home.nickname',
        home.symbol as 'home.symbol',
        away.id_nba as 'away.id_nba',
        away.city as 'away.city',
        away.nickname as 'away.nickname',
        away.symbol as 'away.symbol'
      FROM game_nba g
      JOIN team_nba home ON home.id_nba=g.id_home
      JOIN team_nba away ON away.id_nba=g.id_away
      JOIN round home_round ON home_round.id_round=g.id_round_home
      JOIN round away_round ON away_round.id_round=g.id_round_away
      JOIN season s on home_round.id_season=s.id_season
      WHERE s.current=true;
    `, {model: GameNba}),
  }
};

export default GameNbaQuery;
