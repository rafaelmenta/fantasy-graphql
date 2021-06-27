import { GraphQLInputObjectType, GraphQLInt, GraphQLNonNull } from "graphql";
import Conn from "../../../database/connection";
import { Auction, League, TeamSl, PlayerBid as PlayerBidModel } from "../../../model/setup";
import { AuctionStatus } from "../../object-types/enum/auction-status";
import { PlayerBid } from "../../object-types/player-bid";

const AuctionInput = new GraphQLInputObjectType({
  name: 'AuctionInput',
  fields: () => ({
    id_bid: { type: GraphQLInt },
    id_auction: { type: new GraphQLNonNull(GraphQLInt) },
    id_player: { type: new GraphQLNonNull(GraphQLInt) },
    id_sl: { type: new GraphQLNonNull(GraphQLInt) },
    salary: { type: new GraphQLNonNull(GraphQLInt) },
    years: { type: new GraphQLNonNull(GraphQLInt) },
  }),
});

export const AuctionMutation = {
  saveBid: {
    description: 'Save a bid',
    type: PlayerBid,
    args: { bid: {type: AuctionInput } },
    resolve: async (root, {bid}) => {
      const {
        id_bid,
        id_auction,
        id_player,
        id_sl,
        salary,
        years,
      } = bid;

      const auction = await Auction.findOne({where: {id_auction}});
      if (!auction) {
        throw new Error('AUCTION_NOT_FOUND');
      }

      if (auction.status !== AuctionStatus.parseValue('STATUS_OPEN')) {
        throw new Error('AUCTION_NOT_OPEN');
      }

      const team = await TeamSl.findOne({where: { id_sl }});

      if (!team) {
        throw new Error('TEAM_NOT_FOUND');
      }

      const id_league = team.league_id;
      const league = await League.findOne({where: {id_league}});
      const configs = await league.getConfigs();
      const salaryCapConfig = configs.find(config => config.id_config === 'SALARY_CAP');

      const salaryCap = Number(salaryCapConfig.config_value) * 1000 * 1000;
      if (isNaN(salaryCap)) {
        throw new Error('SALARY_CAP_NOT_AVAILABLE');
      }

      const contracts = await TeamSl.RosterSalary({id_sl, id_league})
      const salaries = contracts.reduce((soFar, contract) => soFar + contract.contract_salary, 0);

      const bids = await PlayerBidModel.findAll({where: {
        id_auction,
        id_sl,
        id_player: {
          $ne: id_player
        },
        expiration: {
          $gte: new Date(),
        },
      }});

      const bidSalaries = bids.reduce((soFar, bidSalary) => soFar + bidSalary.salary, 0);
      const teamCap = salaryCap - salaries - bidSalaries;

      if (teamCap <= 0) {
        throw new Error('NO_CAP_FOR_BID');
      }

      if (teamCap < salary) {
        throw new Error('SALARY_EXCEEDS_CAP');
      }

      const offset = Number(configs.find(config => config.id_config === 'AUCTION_BID_OFFSET_TIME'));

      let expiration;
      if (isNaN(offset)) {
        expiration = new Date(Date.now() + (72 * 60 * 60 * 1000)); // Default
      }  else {
        expiration = new Date(Date.now() + offset);
      }

      let savedIdBid = id_bid;
      const operation = await Conn.transaction(async t => {
        if (id_bid) {
          const updateBid = await PlayerBidModel.findOne({where: id_bid});

          if (!updateBid) {
            throw new Error('BID_DOES_NOT_EXIST');
          }

          if (updateBid.salary >= salary) {
            throw new Error('BID_IS_LOWER');
          }

          const bidUpdate = await PlayerBidModel.update({id_sl, salary, years, expiration}, {
            where: {id_bid}, transaction: t});

          return bidUpdate;
        }

        const bidExists = await PlayerBidModel.findOne({where: {id_auction, id_player}});

        if (bidExists) {
          throw new Error('PLAYER_ALREADY_IN_AUCTION');
        }

        const createBid = await PlayerBidModel.create({id_sl, id_auction, id_player, salary, years, expiration});
        savedIdBid = createBid.id_bid;
      });

      return {id_bid: savedIdBid, id_auction, id_sl, id_player, salary, years, expiration};
    },
  }
};