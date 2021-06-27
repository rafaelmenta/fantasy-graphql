"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuctionMutation = undefined;

var _graphql = require("graphql");

var _connection = require("../../../database/connection");

var _connection2 = _interopRequireDefault(_connection);

var _setup = require("../../../model/setup");

var _auctionStatus = require("../../object-types/enum/auction-status");

var _playerBid = require("../../object-types/player-bid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var AuctionInput = new _graphql.GraphQLInputObjectType({
  name: 'AuctionInput',
  fields: function fields() {
    return {
      id_bid: { type: _graphql.GraphQLInt },
      id_auction: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) },
      id_player: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) },
      id_sl: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) },
      salary: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) },
      years: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) }
    };
  }
});

var AuctionMutation = exports.AuctionMutation = {
  saveBid: {
    description: 'Save a bid',
    type: _playerBid.PlayerBid,
    args: { bid: { type: AuctionInput } },
    resolve: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(root, _ref) {
        var bid = _ref.bid;
        var id_bid, id_auction, id_player, id_sl, salary, years, auction, team, id_league, league, configs, salaryCapConfig, salaryCap, contracts, salaries, bids, bidSalaries, teamCap, offset, expiration, savedIdBid, operation;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id_bid = bid.id_bid, id_auction = bid.id_auction, id_player = bid.id_player, id_sl = bid.id_sl, salary = bid.salary, years = bid.years;
                _context2.next = 3;
                return _setup.Auction.findOne({ where: { id_auction: id_auction } });

              case 3:
                auction = _context2.sent;

                if (auction) {
                  _context2.next = 6;
                  break;
                }

                throw new Error('AUCTION_NOT_FOUND');

              case 6:
                if (!(auction.status !== _auctionStatus.AuctionStatus.parseValue('STATUS_OPEN'))) {
                  _context2.next = 8;
                  break;
                }

                throw new Error('AUCTION_NOT_OPEN');

              case 8:
                _context2.next = 10;
                return _setup.TeamSl.findOne({ where: { id_sl: id_sl } });

              case 10:
                team = _context2.sent;

                if (team) {
                  _context2.next = 13;
                  break;
                }

                throw new Error('TEAM_NOT_FOUND');

              case 13:
                id_league = team.league_id;
                _context2.next = 16;
                return _setup.League.findOne({ where: { id_league: id_league } });

              case 16:
                league = _context2.sent;
                _context2.next = 19;
                return league.getConfigs();

              case 19:
                configs = _context2.sent;
                salaryCapConfig = configs.find(function (config) {
                  return config.id_config === 'SALARY_CAP';
                });
                salaryCap = Number(salaryCapConfig.config_value) * 1000 * 1000;

                if (!isNaN(salaryCap)) {
                  _context2.next = 24;
                  break;
                }

                throw new Error('SALARY_CAP_NOT_AVAILABLE');

              case 24:
                _context2.next = 26;
                return _setup.TeamSl.RosterSalary({ id_sl: id_sl, id_league: id_league });

              case 26:
                contracts = _context2.sent;
                salaries = contracts.reduce(function (soFar, contract) {
                  return soFar + contract.contract_salary;
                }, 0);
                _context2.next = 30;
                return _setup.PlayerBid.findAll({ where: {
                    id_auction: id_auction,
                    id_sl: id_sl,
                    id_player: {
                      $ne: id_player
                    },
                    expiration: {
                      $gte: new Date()
                    }
                  } });

              case 30:
                bids = _context2.sent;
                bidSalaries = bids.reduce(function (soFar, bidSalary) {
                  return soFar + bidSalary.salary;
                }, 0);
                teamCap = salaryCap - salaries - bidSalaries;

                if (!(teamCap <= 0)) {
                  _context2.next = 35;
                  break;
                }

                throw new Error('NO_CAP_FOR_BID');

              case 35:
                if (!(teamCap < salary)) {
                  _context2.next = 37;
                  break;
                }

                throw new Error('SALARY_EXCEEDS_CAP');

              case 37:
                offset = Number(configs.find(function (config) {
                  return config.id_config === 'AUCTION_BID_OFFSET_TIME';
                }));
                expiration = void 0;

                if (isNaN(offset)) {
                  expiration = new Date(Date.now() + 72 * 60 * 60 * 1000); // Default
                } else {
                  expiration = new Date(Date.now() + offset);
                }

                savedIdBid = id_bid;
                _context2.next = 43;
                return _connection2.default.transaction(function () {
                  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(t) {
                    var updateBid, bidUpdate, bidExists, createBid;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (!id_bid) {
                              _context.next = 12;
                              break;
                            }

                            _context.next = 3;
                            return _setup.PlayerBid.findOne({ where: id_bid });

                          case 3:
                            updateBid = _context.sent;

                            if (updateBid) {
                              _context.next = 6;
                              break;
                            }

                            throw new Error('BID_DOES_NOT_EXIST');

                          case 6:
                            if (!(updateBid.salary >= salary)) {
                              _context.next = 8;
                              break;
                            }

                            throw new Error('BID_IS_LOWER');

                          case 8:
                            _context.next = 10;
                            return _setup.PlayerBid.update({ id_sl: id_sl, salary: salary, years: years, expiration: expiration }, {
                              where: { id_bid: id_bid }, transaction: t });

                          case 10:
                            bidUpdate = _context.sent;
                            return _context.abrupt("return", bidUpdate);

                          case 12:
                            _context.next = 14;
                            return _setup.PlayerBid.findOne({ where: { id_auction: id_auction, id_player: id_player } });

                          case 14:
                            bidExists = _context.sent;

                            if (!bidExists) {
                              _context.next = 17;
                              break;
                            }

                            throw new Error('PLAYER_ALREADY_IN_AUCTION');

                          case 17:
                            _context.next = 19;
                            return _setup.PlayerBid.create({ id_sl: id_sl, id_auction: id_auction, id_player: id_player, salary: salary, years: years, expiration: expiration });

                          case 19:
                            createBid = _context.sent;

                            savedIdBid = createBid.id_bid;

                          case 21:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, undefined);
                  }));

                  return function (_x3) {
                    return _ref3.apply(this, arguments);
                  };
                }());

              case 43:
                operation = _context2.sent;
                return _context2.abrupt("return", { id_bid: savedIdBid, id_auction: id_auction, id_sl: id_sl, id_player: id_player, salary: salary, years: years, expiration: expiration });

              case 45:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      }));

      function resolve(_x, _x2) {
        return _ref2.apply(this, arguments);
      }

      return resolve;
    }()
  }
};