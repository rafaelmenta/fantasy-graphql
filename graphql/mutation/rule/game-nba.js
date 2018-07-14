'use strict'

import { GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLInputObjectType, GraphQLBoolean } from 'graphql';
import GameNba from '../../../model/game-nba';

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
};