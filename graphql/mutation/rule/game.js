'use strict'

import { GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLInputObjectType, GraphQLList } from 'graphql';
import Game from '../../../model/game';
import GameType from '../../object-types/game';

const GameInput = new GraphQLInputObjectType({
  name: 'GameInput',
  fields: () => ({
    home_team: { type: new GraphQLNonNull(GraphQLInt) },
    away_team: { type: new GraphQLNonNull(GraphQLString) },
    id_type: { type: new GraphQLNonNull(GraphQLString) },
    id_round: { type: new GraphQLNonNull(GraphQLInt) },
  }),
});

export const GameMutation = {
  createGame: {
    description: 'Create a game',
    type: GameType,
    args: {
      game: {type: GameInput},
    },
    resolve: (root, {game}) => Game.create(game),
  },
  deleteGame: {
    description: 'Delete a game',
    type: GraphQLInt,
    args: {
      id_game: {type: GraphQLInt},
    },
    resolve: (root, {id_game}) => Game.destroy({ where: {id_game} }),
  },
};