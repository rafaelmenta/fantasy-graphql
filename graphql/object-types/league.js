import TeamSlType from './team-sl';
import UserType from './user';
import ConferenceType from './conference';
import LeagueConfigtype from './league-config';
import FreeAgencyHistoryType from './free-agency-history';
import { League, Conference, FreeAgencyHistory, Player, Trade } from '../../model/setup';
import PlayerType from './player';
import TradeType from './trade';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList
} =  graphql;

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
    }
  })
});

export default LeagueType;
