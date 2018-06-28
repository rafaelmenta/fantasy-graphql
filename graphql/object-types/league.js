import TeamSlType from './team-sl';
import UserType from './user';
import ConferenceType from './conference';
import LeagueConfigtype from './league-config';
import FreeAgencyHistoryType from './free-agency-history';
import { League, Conference, FreeAgencyHistory, Trade, Pick, TeamSl, Division, Draft } from '../../model/setup';
import PlayerType from './player';
import TradeType from './trade';
import SeasonType from './season';
import DraftType from './draft';
import DraftStatus from './enum/draft-status';
import Player from '../../model/player';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
} =  graphql;

let teamMap;

const ManualTeam = function(type){
  return {
    type: new GraphQLObjectType({
      name: `ManualTeam${type}`,
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
    name: 'ManualPicks',
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

const LeagueType = new GraphQLObjectType({
  name: 'League',
  fields: () => ({
    id_league: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
    },
    symbol: {
      type: GraphQLString,
    },
    number_of_teams: {
      type: GraphQLInt
    },
    owner: {
      type: UserType,
      resolve: resolver(League.Owner)
    },
    conferences: {
      type: new GraphQLList(ConferenceType),
      resolve: resolver(League.Conferences)
    },
    teams: {
      type: new GraphQLList(TeamSlType),
      resolve: League.Teams
    },
    configs: {
      type: new GraphQLList(LeagueConfigtype),
      resolve: resolver(League.Configs)
    },
    free_agency_history: {
      type: new GraphQLList(FreeAgencyHistoryType),
      resolve: FreeAgencyHistory.ByLeague
    },
    free_agents: {
      type: new GraphQLList(PlayerType),
      resolve: League.FreeAgents,
    },
    trade_history: {
      type: new GraphQLList(TradeType),
      resolve: Trade.History,
    },
    previous_drafts: {
      type: new GraphQLList(DraftType),
      resolve: league => Draft.findAll({
        where: {
          id_league: league.id_league,
          $or: {
            status_draft: DraftStatus.parseValue('STATUS_FINISHED'),
            year_draft: {
              $lt: new Date().getFullYear(),
            }
          }
        }
      }),
    },
    next_drafts: {
      type: new GraphQLList(DraftType),
      resolve: league => Draft.findAll({
        where: {
          id_league: league.id_league,
          year_draft: {
            $gte: new Date().getFullYear(),
          }
        }
      }),
    },
    current_draft: {
      type: new GraphQLObjectType({
        name: 'ManualDraft',
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
      resolve: league => {
        return League.MostRecentDraft(league);
      },
    },
  })
});

export default LeagueType;
