import TeamSlType from '../../object-types/team-sl';
import {League, PlayerBid, TeamSl} from '../../../model/setup';
import { ManualTeamOverviewQuery } from '../../object-types/manual/team-overview';
import { ManualTeamRosterQuery } from '../../object-types/manual/team-roster';
import Trade from '../../../model/trade';
import TradeStatus from '../../object-types/enum/trade-status';
import Conn from '../../../database/connection';
import { AuctionStatus } from '../../object-types/enum/auction-status';

import "core-js/stable";
import "regenerator-runtime/runtime";

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} =  graphql;

const CapType = new graphql.GraphQLObjectType({
  name: 'CapType',
  fields: {
    salary_cap: { type: graphql.GraphQLFloat },
    team_salaries: { type: graphql.GraphQLFloat },
    open_bids: { type: graphql.GraphQLFloat },
  }
});

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
  },
  cap: {
    type: CapType,
    args: {id_sl: { type: GraphQLInt}},
    resolve: async (root, {id_sl}) => {
      const team = await TeamSl.findOne({where: {id_sl}});
      if (!team) { throw new Error('TEAM_NOT_FOUND')};

      const league = await League.findOne({ where: { id_league: team.league_id } });
      const configs = await league.getConfigs();
      const salaryCapConfig = configs.find(config => config.id_config === 'SALARY_CAP');

      const salaryCap = Number(salaryCapConfig.config_value) * 1000 * 1000;
      if (isNaN(salaryCap)) {
        throw new Error('SALARY_CAP_NOT_AVAILABLE');
      }

      const query = await Conn.query(`
        SELECT sum(b.salary) as salary
        FROM player_bid b
        JOIN auction a ON a.id_auction=b.id_auction
        WHERE a.status = ${AuctionStatus.parseValue('STATUS_OPEN')}
          AND b.id_sl = ${id_sl}
          AND b.expiration >= CURDATE();
      `, {model: PlayerBid});
      const contracts = await TeamSl.RosterSalary({ id_sl, id_league: team.league_id })
      const salaries = contracts.reduce((soFar, contract) => soFar + contract.contract_salary, 0);

      return {
        salary_cap: salaryCap,
        team_salaries: salaries,
        open_bids: query[0].salary,
      };
    },
  },
};

export default TeamSLQuery;
