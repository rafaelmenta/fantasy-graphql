import TeamNbaType from './team-nba';
import RoundType from './round';
import {GameNba} from '../../model/setup';
import GraphQLDate from 'graphql-date';
import dottie from 'dottie';
import Conn from '../../database/connection';

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
    manual_home_team: {
      type: TeamNbaType,
      resolve: game => dottie.transform(game.dataValues).home,
    },
    manual_away_team: {
      type: TeamNbaType,
      resolve: game => dottie.transform(game.dataValues).away,
    },
    manual_round_home: {
      type: RoundType,
      resolve: game => dottie.transform(game.dataValues).home_round,
    },
    manual_round_away: {
      type: RoundType,
      resolve: game => dottie.transform(game.dataValues).away_round,
    },
    manual_is_done: {
      type: GraphQLBoolean,
      resolve: (game) => Conn.query(`
        SELECT count(*) as count
        FROM player_performance
        JOIN player ON player_performance.id_player=player.id_player
        WHERE minutes > 0
          AND (
            (id_round=${game.dataValues['home_round.id_round']} AND id_nba=${game.dataValues['home.id_nba']})
            OR
            (id_round=${game.dataValues['away_round.id_round']} AND id_nba=${game.dataValues['away.id_nba']})
          )
        `, {raw: true, plain: true}).then(result => result.count > 0),
    },
    game_time : { type : GraphQLDate },
    is_finished : { type : GraphQLBoolean },
    external_id : { type : GraphQLString }
  })
});

export default GameNbaType;
