import UserType from './user';
import PlayerType from './player';
import DivisionType from './division';
import PickType from './pick';
import TradeType from './trade';
import TeamStatsType from './team-stats';
import TeamSeasonType from './team-season';
import GameType from './game';
import {TeamSl} from '../../model/setup';

import TradeStatus from './enum/trade-status';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList
} =  graphql;

const TeamSlType = new GraphQLObjectType({
  name: 'TeamSl',
  fields: () => ({
    id_sl: { type: GraphQLInt },
    id_division: { type: GraphQLInt },
    league_id: { type: GraphQLInt },
    city: { type: GraphQLString },
    nickname: { type: GraphQLString },
    symbol: { type: GraphQLString },
    primary_color: { type: GraphQLString },
    secondary_color: { type: GraphQLString },
    slug: { type: GraphQLString },
    waiver: { type: GraphQLInt },

    users: {
      type: new GraphQLList(UserType),
      resolve: resolver(TeamSl.Users)
    },
    players: {
      type: new GraphQLList(PlayerType),
      resolve: resolver(TeamSl.Players)
    },
    division: {
      type: DivisionType,
      resolve: resolver(TeamSl.Division)
    },
    stats : {
      type: TeamStatsType,
      resolve: TeamSl.Stats,
      args: {
        id_season: {
          type: GraphQLInt,
          defaultValue: 'CURRENT'
        }
      }
    },
    picks : {
      type: new GraphQLList(PickType),
      resolve: TeamSl.Picks
    },
    record: {
      type: TeamSeasonType,
      resolve : TeamSl.Record,
      args: {
        id_season : {
          type: GraphQLInt,
          defaultValue: 'CURRENT'
        }
      }
    },
    sent_trades : {
      type: new GraphQLList(TradeType),
      resolve: resolver(TeamSl.SentTrades),
      args: {
        status_trade : {
          name: 'status_trade',
          type: new GraphQLList(GraphQLInt),
          defaultValue: TradeStatus.parseValue('PENDING')
        }
      }
    },
    received_trades : {
      type: new GraphQLList(TradeType),
      resolve: resolver(TeamSl.ReceivedTrades),
      args: {
        status_trade : {
          name: 'status_trade',
          type: new GraphQLList(GraphQLInt),
          defaultValue: TradeStatus.parseValue('PENDING')
        }
      }
    },
    recent_games: {
      type: new GraphQLList(GameType),
      resolve: TeamSl.RecentGames
    },
    next_games: {
      type: new GraphQLList(GameType),
      resolve: TeamSl.NextGames
    },
    all_games: {
      type: new GraphQLList(GameType),
      resolve: TeamSl.AllGames,
      args: {
        id_season: {
          name: 'id_season',
          type: GraphQLInt
        }
      }
    },
    playoffs_games: {
      type: new GraphQLList(GameType),
      resolve: TeamSl.PlayoffsGames,
      args: {
        id_season: {
          name: 'id_season',
          type: GraphQLInt
        }
      }
    },
    records: {
      type: new GraphQLList(TeamSeasonType),
      resolve : resolver(TeamSl.Records),
      args: {
        id_season : { type : new GraphQLList(GraphQLInt) }
      }
    },
  })
});

export default TeamSlType;
