'use strict'

import { GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLInputObjectType, GraphQLList } from 'graphql';
import GameNba from '../../../model/game-nba';
import PlayerPerformance from '../../../model/player-performance';
import Conn from '../../../database/connection';
import { PlayerTeamPerformance } from '../../../model/setup';

const GameNbaInput = new GraphQLInputObjectType({
  name: 'GameNbaInput',
  fields: () => ({
    id_away: { type: new GraphQLNonNull(GraphQLInt) },
    id_home: { type: new GraphQLNonNull(GraphQLInt) },
    id_round_home: { type: new GraphQLNonNull(GraphQLInt) },
    id_round_away: { type: new GraphQLNonNull(GraphQLInt) },
    game_time: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const PlayerPerformanceInput = new GraphQLInputObjectType({
  name: 'PlayerPerformanceInput',
  fields: () => ({
    id_player_performance: { type: new GraphQLNonNull(GraphQLInt) },
    minutes: { type: GraphQLInt },
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

export const GameNbaMutation = {
  addNbaGame: {
    description: 'Create an NBA game',
    type: GraphQLInt,
    args: { input: {type: GameNbaInput} },
    resolve: (root, { input }) => GameNba.create(input).then(game => game.id_game_nba),
  },
  deleteNbaGame: {
    description: 'Delete an NBA game',
    type: GraphQLInt,
    args: {
      id_game_nba: { type: GraphQLInt },
    },
    resolve: (root, { id_game_nba }) => GameNba.destroy({ where: { id_game_nba } }),
  },
  saveNbaPerformances: {
    description: 'Save player performances',
    type: new GraphQLList(new GraphQLList(GraphQLInt)),
    args: {
      performances: {type: new GraphQLList(PlayerPerformanceInput)},
    },
    resolve: (root, {performances}) => Conn.transaction(t => {
      const updates = performances.filter(perf => perf.minutes !== 0).map(perf => {
        perf.fantasy_points = calculateFantasyPoints(perf).toFixed(2);
        return PlayerPerformance.update(perf, {
          where: { id_player_performance: perf.id_player_performance },
          transaction: t,
        });
      });

      // PlayerTeamPerformance.findAll({where: {id_round: 700 }}).then(results => {
      //   console.warn('results', results);
      // });

      return Promise.all(updates);
    }),
  }
};

const calculateFantasyPoints = perf => {
  return (perf.points
    - (perf.field_goal_attempts * 0.4)
    - (perf.free_throw_attempts * 0.2)
    + (perf.offensive_rebounds * 1.2)
    + perf.defensive_rebounds
    + (perf.assists * 1.1)
    + (perf.steals * 1.2)
    + (perf.blocks * 1.3)
    - (perf.turnovers * 1.1)
    - perf.personal_fouls
    + perf.win_loss);
};
