import TeamSlType from '../../object-types/team-sl';
import {TeamSl} from '../../../model/setup';
import { ManualTeamOverviewQuery } from '../../object-types/manual/team-overview';
import { ManualTeamRosterQuery } from '../../object-types/manual/team-roster';
import Trade from '../../../model/trade';
import TradeStatus from '../../object-types/enum/trade-status';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} =  graphql;

const TeamSLQuery = {
  team: {
    type: TeamSlType,
    resolve: resolver(TeamSl),
    args: {
      id_sl: {
        name: 'id_sl',
        type: GraphQLInt
      },
      slug: {
        name: 'slug',
        type: GraphQLString
      }
    }
  },
  teams: {
    type: new GraphQLList(TeamSlType),
    resolve: resolver(TeamSl),
    args: {
      id_sl: {
        name: 'id_sl',
        type: new GraphQLList(GraphQLInt)
      }
    }
  },
  team_overview: ManualTeamOverviewQuery,
  team_roster: ManualTeamRosterQuery,
  team_trades: {
    type: GraphQLInt,
    args: {
      id_sl: {
        name: 'id_sl',
        type: GraphQLInt,
      },
    },
    resolve: (root, args) => Trade.count({
      where: {
        id_receiver: args.id_sl,
        status_trade: TradeStatus.parseValue('PENDING'),
      },
    }),
  }
};

export default TeamSLQuery;
