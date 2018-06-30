import DraftType from '../../object-types/draft';
import {Draft, Pick, Division, Conference, Season} from '../../../model/setup';
import SeasonType from '../../object-types/season';
import TeamSl from '../../../model/team-sl';
import PlayerType from '../../object-types/player';
import Player from '../../../model/player';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
} =  graphql;

let teamMap = {};

const ManualTeam = function (type) {
  return {
    type: new GraphQLObjectType({
      name: `ManualDraftTeam${type}`,
      fields: () => ({
        id_sl: {
          type: GraphQLInt,
        },
        city: {
          type: GraphQLString,
        },
        nickname: {
          type: GraphQLString,
        },
        slug: {
          type: GraphQLString,
        },
        symbol: {
          type: GraphQLString,
        },
      }),
    }),
    resolve: pick => {
      return teamMap[pick[type]];
    },
  };
}

const ManualPicks = {
  type: new GraphQLList(new GraphQLObjectType({
    name: 'ManualDraftPicks',
    fields: () => ({
      id_pick: { type: GraphQLInt },
      round: { type: GraphQLInt },
      order: { type: GraphQLInt },
      is_used: { type: GraphQLBoolean },
      deadline: { type: GraphQLString },
      id_player: { type: GraphQLInt },
      player: {
        type: PlayerType,
        resolve: pick => pick.id_player && Player.findOne({ where: { id_player: pick.id_player } }),
      },
      owner: ManualTeam('id_owner'),
      original: ManualTeam('id_sl_original'),
    })
  })),
  resolve: draft => {
    const picks$ = Pick.findAll({
      where: {
        id_draft: draft.id_draft
      }
    });

    const teams$ = TeamSl.findAll({
      include: [{
        model: Division,
        include: [{
          model: Conference,
          where: {
            id_league: draft.id_league,
          },
        }],
      }],
    });

    return Promise.all([picks$, teams$]).then(results => {
      teamMap = results[1].reduce((teams, team) => {
        teams[team.id_sl] = team;
        return teams;
      }, {});
      return results[0];
    });

  },
};

const DraftQuery = {
  draft : {
    type: DraftType,
    resolve : resolver(Draft),
    args : {
      id_draft : {
        name : 'id_draft',
        type : new GraphQLNonNull(GraphQLInt)
      }
    }
  },
  drafts: {
    type: new GraphQLList(DraftType),
    resolve: resolver(Draft),
    args : {
      id_league : {
        name : 'id_league',
        type : GraphQLInt
      },
      year_draft : {
        name : 'year_draft',
        type : GraphQLInt
      }
    }
  },
  draft_overview: {
    type: new GraphQLObjectType({
      name: 'ManualDraftOverview',
      fields: () => ({
        id_draft: { type: GraphQLInt },
        id_league: { type: GraphQLInt },
        year_draft: { type: GraphQLInt },
        draft_type: { type: GraphQLInt },
        status_draft: { type: GraphQLString },
        season: { type: SeasonType },
        picks: ManualPicks,
      }),
    }),
    args: {
      id_draft: {
        name: 'id_draft',
        type: GraphQLInt,
      }
    },
    resolve: (root, args) => Draft.findOne({
      include: [{
        model: Season,
      }],
      where: {
        id_draft: args.id_draft
      },
    }),
  }
};

export default DraftQuery;
