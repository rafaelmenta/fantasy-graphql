import { GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import PlayerType from '../player';
import { PlayerPerformance, TeamNba, Player } from '../../../model/setup';
import GameNba from '../../../model/game-nba';
import TeamNbaType from '../team-nba';

const ManualPlayerGamePerformance = new GraphQLObjectType({
  name: 'ManualPlayerGamePerformance',
  fields: () => ({
    player: {type: PlayerType },
    id_player_performance: {type: GraphQLInt},
    minutes: {type: GraphQLInt},
    field_goal_attempts: { type: GraphQLInt },
    free_throw_attempts: { type: GraphQLInt },
    points: { type: GraphQLInt },
    defensive_rebounds: { type: GraphQLInt },
    offensive_rebounds: { type: GraphQLInt },
    assists: { type: GraphQLInt },
    steals: { type: GraphQLInt },
    blocks: { type: GraphQLInt },
    turnovers: { type: GraphQLInt },
    personal_fouls: { type: GraphQLInt },
    win_loss: { type: GraphQLInt },
  }),
});

export const ManualGamePerformance = new GraphQLObjectType({
  name: 'ManualGamePerformance',
  fields: () => ({
    home: {type: TeamNbaType},
    away: {type: TeamNbaType},
    id_round_home: {type: GraphQLInt},
    id_round_away: {type: GraphQLInt},
    home_performances: {type: new GraphQLList(ManualPlayerGamePerformance)},
    away_performances: {type: new GraphQLList(ManualPlayerGamePerformance)},
  }),
})

// Export query ------------------------------------------------------------------------------------

export const ManualGamePerformanceQuery = {
  type: ManualGamePerformance,
  args: {
    id_game_nba: { name: 'id_game_nba', type: GraphQLInt },
  },
  resolve: (root, {id_game_nba}) => GameNba.findOne({where: {id_game_nba}}).then(game => {
    const home = TeamNba.findOne({where: {id_nba: game.id_home}});
    const away = TeamNba.findOne({where: {id_nba: game.id_away}});
    const home_performances = PlayerPerformance.findAll({
      include: [{model: Player, where: {id_nba: game.id_home}}],
      where: {
        id_round: game.id_round_home,
      },
    });
    const away_performances = PlayerPerformance.findAll({
      include: [{model: Player, where: {id_nba: game.id_away}}],
      where: {
        id_round: game.id_round_away,
      },
    });

    return Promise.all([home, away, home_performances, away_performances]).then(results => ({
      home: results[0],
      away: results[1],
      id_round_home: game.id_round_home,
      id_round_away: game.id_round_away,
      home_performances: results[2],
      away_performances: results[3],
    }));
  }),
};

