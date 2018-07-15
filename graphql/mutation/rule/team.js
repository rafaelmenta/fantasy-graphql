import PlayerType from '../../object-types/player';
import {TeamPlayer, Player, Division, FreeAgencyHistory, UserTeam, Taxonomy} from '../../../model/setup';
import TeamSl from '../../../model/team-sl';
import Conference from '../../../model/conference';
import Conn from '../../../database/connection';
import LeagueConfig from '../../../model/associations/league-config';

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
    resolve: (root, {team_info}) => {

      FreeAgencyHistory.create({
        action: 'DROP',
        id_sl: team_info.id_sl,
        event_date: Date.now(),
        id_player: team_info.id_player,
      });

      return TeamPlayer.destroy({
        where: team_info,
      })
    }
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
  updateTeamInfo: {
    description: 'Update team info',
    type: new GraphQLList(GraphQLInt),
    args: {
      id_sl: { type: new GraphQLNonNull(GraphQLInt) },
      city: { type: GraphQLString },
      nickname: { type: GraphQLString },
      slug: { type: GraphQLString },
      id_division: { type: GraphQLInt },
      id_user: { type: GraphQLInt },
    },
    resolve: (root, {id_sl, city, nickname, slug, id_division, id_user}) =>
    Conn.transaction(t => TeamSl.findOne({where: {id_sl}}).then(team => {
      const update = {};
      if (city) {
        update.city = city;
      }

      if (nickname) {
        update.nickname = nickname;
      }

      let slugQuery;
      if (slug) {
        update.slug = slug;
        slugQuery = Taxonomy.update({slug}, {where: {slug: team.slug}, transaction: t});
      }

      if (id_division) {
        update.id_division = id_division
      }

      const updateInfoQuery = TeamSl.update(update, {where: {id_sl}, transaction: t});
      const updates = [updateInfoQuery];

      if (slugQuery) {
        updates.push(slugQuery);
      }

      if (id_user) {
        const userTeamQuery = UserTeam.update({id_user}, {where: {id_sl}, transaction: t});
        updates.push(userTeamQuery);
      }

      return Promise.all(updates).then(results => results[0]);
    })),
  },
  recruitPlayer: {
    description: 'Returns player',
    type: PlayerType,
    args: {
      team_info: { type: input },
      id_league: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: (root, {team_info, id_league}) => LeagueConfig.findOne(
      {where: {id_config: 'FREE_AGENCY_LOCKED', id_league}
    }).then(config => {
      if (config && config.config_value === '1') {
        throw new Error('Free agency is locked')
      }
      return;
    }).then(() => TeamPlayer.findOne({
      where: { id_player: team_info.id_player },
      include: [{
        model: TeamSl,
        foreignKey: 'id_sl',
        include: [{
          model: Division,
          foreignKey: 'id_division',
          include: [{
            model: Conference,
            foreignKey: 'id_conference',
            where: { id_league }
          }]
        }]
      }]
    }).then(teamPlayer =>  {
      if (teamPlayer && teamPlayer.id_sl !== 0) return null;

      return Player.findOne({
        where: { id_player: team_info.id_player },
      });
    }).then(player => {
      if (!player) return null;

      FreeAgencyHistory.create({
        action: 'PICK',
        event_date: Date.now(),
        id_sl: team_info.id_sl,
        id_player: player.id_player,
      });

      TeamPlayer.create({
        id_sl: team_info.id_sl,
        id_player: player.id_player,
        primary_position: player.default_primary,
        secondary_position: player.default_secondary
      })

      return player;
    })
  )}
}

export default TeamMutation;
