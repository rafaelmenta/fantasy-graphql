import Conn from '../../../database/connection';
import Player from '../../../model/player';
import { Taxonomy } from '../../../model/setup';
import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';

const input = new GraphQLInputObjectType({
  name: 'PlayerInput',
  fields: () => ({
    id_player: { type: GraphQLInt },
    first_name: { type: new GraphQLNonNull(GraphQLString) },
    last_name: { type: new GraphQLNonNull(GraphQLString) },
    player_slug: { type: new GraphQLNonNull(GraphQLString) },
    default_primary: { type: new GraphQLNonNull(GraphQLString) },
    default_secondary: { type: new GraphQLNonNull(GraphQLString) },
    id_nba: { type: new GraphQLNonNull(GraphQLInt) },
    rookie: { type: GraphQLBoolean },
    birthdate: { type: GraphQLString },
  })
});

export const PlayerMutation = {
  retirePlayer: {
    description: 'Retire a player',
    type: new GraphQLList(GraphQLInt),
    args: {
      id_player: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: (root, {id_player}) => Player.update({retired: true}, {where: {id_player}}),
  },
  savePlayer: {
    description: 'Update player info',
    type: GraphQLInt,
    args: {
      player: {type: input},
    },
    resolve: (root, {player}) =>
    Conn.transaction(t => {
      const validPositions = ['PG', 'SG', 'SF', 'PF', 'C'];
      if (!validPositions.includes(player.default_primary)) {
        throw new Error(`Invalid position: [${player.default_primary}]`);
      }

      if (!validPositions.includes(player.default_secondary)) {
        throw new Error(`Invalid position: [${player.default_secondary}]`);
      }

      if (player.id_nba < 1 || player.id_nba > 31) {
        throw new Error(`Invalid nba team: ${player.id_nba}`);
      }

      const date = new Date(player.birthdate);
      const validDate = date instanceof Date && !isNaN(date);

      if (!validDate) {
        throw new Error(`Invald birthdate: ${player.birthdate}`);
      }

      const playerUpdate = {
        first_name: player.first_name,
        last_name: player.last_name,
        player_slug: player.player_slug,
        default_primary: player.default_primary,
        default_secondary: player.default_secondary,
        id_nba: player.id_nba,
        rookie: player.rookie,
        birthdate: player.birthdate,
      };

      if (!player.id_player) {
        return Player.create(playerUpdate, {transaction: t})
          .then(createdPlayer =>
            Taxonomy.create({slug: player.player_slug, id: createdPlayer.id_player}, {transaction: t}))
          .then(createdTaxonomy => createdTaxonomy.id);
      }

      const playerQuery = Player.update(playerUpdate, {where: {id_player: player.id_player}, transaction: t});
      const slugUpdate = {slug: player.player_slug};
      const slugQuery = Player.findOne({where: {id_player: player.id_player} }, {transaction: t})
        .then(p => Taxonomy.update(slugUpdate, {where: {slug: p.player_slug}, transaction: t}));

      return Promise.all([playerQuery, slugQuery]).then(() => player.id_player);
    }),
  },
}
