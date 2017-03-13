import PlayerType from '../../object-types/player';
import {TeamPlayer, Player} from '../../../model/setup';

const graphql = require('graphql');

const {
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull

} =  graphql;

const input = new GraphQLInputObjectType({
  name: 'TeamInfoInput',
  fields: () => ({
    id_sl: { type: new GraphQLNonNull(GraphQLInt) },
    id_player: { type: new GraphQLNonNull(GraphQLInt) },
    primary_position: { type: GraphQLString },
    secondary_position: { type: GraphQLString },
    order: { type: GraphQLInt },
  })
});

const TeamMutation = {
  swapPosition: {
    description: 'Returns [update_count]',
    type: new GraphQLList(GraphQLInt),
    args: {
      team_info: { type: input }
    },
    resolve : (root, {team_info}) => TeamPlayer.findOne({
      where: team_info
    }).then(teamInfo => teamInfo && TeamPlayer.update({
      primary_position: teamInfo.secondary_position,
      secondary_position: teamInfo.primary_position
    }, { where: team_info }))
  },
  dumpPlayer: {
    description: 'Returns delete_count',
    type: GraphQLInt,
    args: {
      team_info: { type: input }
    },
    resolve: (root, {team_info}) => TeamPlayer.destroy({
      where: team_info
    })
  },
  saveRoster: {
    description: 'Returns',
    type: GraphQLBoolean,
    args: {
      roster: { type: new GraphQLList(input) }
    },
    resolve: (root, {roster}) => {
      let promises = roster.map(teamPlayer => TeamPlayer.update({
        primary_position: teamPlayer.primary_position,
        secondary_position: teamPlayer.secondary_position,
        order: teamPlayer.order
      }, { where : {
        id_player: teamPlayer.id_player,
        id_sl: teamPlayer.id_sl
      }}));

      return Promise.all(promises).then(results => {
        return results && results.length > 0
      })
    }
  },
  recruitPlayer: {
    description: 'Returns player',
    type: PlayerType,
    args: {
      team_info: { type: input }
    },
    resolve: (root, {team_info}) => Player.findOne({
        where: { id_player: team_info.id_player }
    }).then(player => {
      if (!player) return null;

      TeamPlayer.create({
        id_sl: team_info.id_sl,
        id_player: player.id_player,
        primary_position: player.default_primary,
        secondary_position: player.default_secondary
      })

      return player;
    })
  }
}

export default TeamMutation;
