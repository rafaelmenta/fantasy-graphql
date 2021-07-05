import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull } from "graphql";
import Conn from "../../../database/connection";
import { Auction, League, TeamSl, PlayerBid as PlayerBidModel, PlayerBidHistory, PlayerLeagueSalary, TeamPlayer, FreeAgencyHistory } from "../../../model/setup";
import { AuctionStatus } from "../../object-types/enum/auction-status";
import { PlayerBid } from "../../object-types/player-bid";

import "core-js/stable";
import "regenerator-runtime/runtime";

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
  processBid: {
    description: 'Process expired bids',
    type: GraphQLBoolean,
    args: {},
    resolve: async (root) => {
      const now = Date.now();
      const unprocessedBids = await PlayerBidModel.findAll({where: {
        expiration: {
          $lt: now,
        },
        processed: false,
      }});

      for (const bid of unprocessedBids) {
        const player = await bid.getPlayer();
        const team = await bid.getTeam();

        const salary = await PlayerLeagueSalary.findOne({
          where: {
            id_player: bid.id_player,
            id_league: team.league_id,
          },
        });

        await Conn.transaction(async t => {
          if (salary) {
            await PlayerLeagueSalary.update({
              contract_salary: bid.salary,
              contract_years: bid.years,
            }, { where: {pls_code: salary.pls_code}, transaction: t});
          } else {
            await PlayerLeagueSalary.create({
              id_player: bid.id_player,
              id_league: team.league_id,
              contract_salary: bid.salary,
              contract_years: bid.years,
            }, {transaction: t});
          };

          const sameBids = await PlayerBidHistory.findAll({
            where: {
              id_bid: bid.id_bid,
              salary: bid.salary,
              years: bid.years,
            },
            transaction: t,
          });

          let winner = team;
          if (sameBids.length > 1) {
            for (const sameBid of sameBids) {
              const sameBidTeam = await sameBid.getTeam();
              if (sameBidTeam.waiver < winner.waiver) {
                winner = sameBidTeam;
              }
            }
          }

          const waiverTeams = await TeamSl.findAll({
            where: {
              league_id: team.league_id,
            },
            transaction: t,
          });

          for (const waiverTeam of waiverTeams) {
            if (waiverTeam.waiver < winner.waiver) { continue; }

            TeamSl.update({
              waiver: waiverTeam.waiver - 1,
            }, {where: {
              id_sl: waiverTeam.id_sl,
            }, transaction: t});
          }

          TeamSl.update({
            waiver: waiverTeams.length,
          }, {where: {
            id_sl: winner.id_sl,
          }, transaction: t});

          await FreeAgencyHistory.create({
            action: 'PICK',
            event_date: now,
            id_sl: winner.id_sl,
            id_player: bid.id_player,
          }, {transaction: t});

          await TeamPlayer.create({
            id_sl: winner.id_sl,
            id_player: bid.id_player,
            primary_position: player.default_primary,
            secondary_position: player.default_secondary,
            order: 999,
          }, {transaction: t});

          await PlayerBidModel.update({
            processed: true,
          }, {where: {id_bid: bid.id_bid}, transaction: t});
        });
      }

      return true;
    },
  },
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

      const maxPlayers = Number(configs.find(config => config.id_config === 'MAX_PLAYERS').config_value);
      const roster = await team.getPlayers();

      if (roster.length + bids.length >= maxPlayers) {
        throw new Error('BID_EXCEEDS_ROSTER');
      }

      const offset = Number(configs.find(config => config.id_config === 'AUCTION_BID_OFFSET_TIME').config_value);

      const now = Date.now();
      const nowDate = new Date();
      let expiration;
      if (isNaN(offset)) {
        expiration = new Date(now + (72 * 60 * 60 * 1000)); // Default
      }  else {
        expiration = new Date(now + offset);
      }

      let savedIdBid = id_bid;
      const operation = await Conn.transaction(async t => {
        if (id_bid) {
          const updateBid = await PlayerBidModel.findOne({where: id_bid});

          if (!updateBid) {
            throw new Error('BID_DOES_NOT_EXIST');
          }

          const updateTotal = updateBid.salary * updateBid.years;
          const total = salary * years;
          if (updateTotal > total) {
            throw new Error('BID_IS_LOWER');
          }

          // Bids expiring in less than 24 hours will only extend for an additional day.
          const tomorrow = new Date(now + 24 * 60 * 60 * 1000);
          if (updateBid.expiration < tomorrow) {
            expiration = tomorrow;
          }

          let shouldUpdateBid = true;
          if (updateTotal === total) {
            const updateTeam = await updateBid.getTeam();

            if (team.waiver > updateTeam.waiver) {
              shouldUpdateBid = false;
            }
          }

          if (shouldUpdateBid) {
            const bidUpdate = await PlayerBidModel.update({id_sl, salary, years, expiration}, {
              where: {id_bid}, transaction: t});
          }

        } else {
          const bidExists = await PlayerBidModel.findOne({where: {id_auction, id_player}});

          if (bidExists) {
            throw new Error('PLAYER_ALREADY_IN_AUCTION');
          }

          const createBid = await PlayerBidModel.create({id_sl, id_auction, id_player, salary, years, expiration}, {transaction: t});
          savedIdBid = createBid.id_bid;
        }

        const bidHistory = await PlayerBidHistory.findOne({
          where: {
            id_bid: savedIdBid,
            id_sl,
            id_player,
            salary,
            years
          },
        });

        if (bidHistory) {
          throw new Error('BID_ALREADY_EXISTS');
        }

        return PlayerBidHistory.create({id_sl, id_player, salary, years, bid_time: nowDate, id_bid: savedIdBid}, {transaction: t});
      });

      return {id_bid: savedIdBid, id_auction, id_sl, id_player, salary, years, expiration};
    },
  }
};