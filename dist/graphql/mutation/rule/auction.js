"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuctionMutation = void 0;

var _graphql = require("graphql");

var _connection = _interopRequireDefault(require("../../../database/connection"));

var _setup = require("../../../model/setup");

var _auctionStatus = require("../../object-types/enum/auction-status");

var _playerBid = require("../../object-types/player-bid");

require("core-js/stable");

require("regenerator-runtime/runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var AuctionInput = new _graphql.GraphQLInputObjectType({
  name: 'AuctionInput',
  fields: function fields() {
    return {
      id_bid: {
        type: _graphql.GraphQLInt
      },
      id_auction: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt)
      },
      id_player: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt)
      },
      id_sl: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt)
      },
      salary: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt)
      },
      years: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt)
      }
    };
  }
});
var AuctionMutation = {
  processBid: {
    description: 'Process expired bids',
    type: _graphql.GraphQLBoolean,
    args: {},
    resolve: function () {
      var _resolve = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(root) {
        var now, unprocessedBids, _iterator, _step, _loop;

        return regeneratorRuntime.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                now = Date.now();
                _context3.next = 3;
                return _setup.PlayerBid.findAll({
                  where: {
                    expiration: {
                      $lt: now
                    },
                    processed: false
                  }
                });

              case 3:
                unprocessedBids = _context3.sent;
                _iterator = _createForOfIteratorHelper(unprocessedBids);
                _context3.prev = 5;
                _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop() {
                  var bid, player, team, salary;
                  return regeneratorRuntime.wrap(function _loop$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          bid = _step.value;
                          _context2.next = 3;
                          return bid.getPlayer();

                        case 3:
                          player = _context2.sent;
                          _context2.next = 6;
                          return bid.getTeam();

                        case 6:
                          team = _context2.sent;
                          _context2.next = 9;
                          return _setup.PlayerLeagueSalary.findOne({
                            where: {
                              id_player: bid.id_player,
                              id_league: team.league_id
                            }
                          });

                        case 9:
                          salary = _context2.sent;
                          _context2.next = 12;
                          return _connection["default"].transaction( /*#__PURE__*/function () {
                            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(t) {
                              var sameBids, winner, _iterator2, _step2, sameBid, sameBidTeam, waiverTeams, _iterator3, _step3, waiverTeam;

                              return regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                  switch (_context.prev = _context.next) {
                                    case 0:
                                      if (!salary) {
                                        _context.next = 5;
                                        break;
                                      }

                                      _context.next = 3;
                                      return _setup.PlayerLeagueSalary.update({
                                        contract_salary: bid.salary,
                                        contract_years: bid.years
                                      }, {
                                        where: {
                                          pls_code: salary.pls_code
                                        },
                                        transaction: t
                                      });

                                    case 3:
                                      _context.next = 7;
                                      break;

                                    case 5:
                                      _context.next = 7;
                                      return _setup.PlayerLeagueSalary.create({
                                        id_player: bid.id_player,
                                        id_league: team.league_id,
                                        contract_salary: bid.salary,
                                        contract_years: bid.years
                                      }, {
                                        transaction: t
                                      });

                                    case 7:
                                      ;
                                      _context.next = 10;
                                      return _setup.PlayerBidHistory.findAll({
                                        where: {
                                          id_bid: bid.id_bid,
                                          salary: bid.salary,
                                          years: bid.years
                                        },
                                        transaction: t
                                      });

                                    case 10:
                                      sameBids = _context.sent;
                                      winner = team;

                                      if (!(sameBids.length > 1)) {
                                        _context.next = 32;
                                        break;
                                      }

                                      _iterator2 = _createForOfIteratorHelper(sameBids);
                                      _context.prev = 14;

                                      _iterator2.s();

                                    case 16:
                                      if ((_step2 = _iterator2.n()).done) {
                                        _context.next = 24;
                                        break;
                                      }

                                      sameBid = _step2.value;
                                      _context.next = 20;
                                      return sameBid.getTeam();

                                    case 20:
                                      sameBidTeam = _context.sent;

                                      if (sameBidTeam.waiver < winner.waiver) {
                                        winner = sameBidTeam;
                                      }

                                    case 22:
                                      _context.next = 16;
                                      break;

                                    case 24:
                                      _context.next = 29;
                                      break;

                                    case 26:
                                      _context.prev = 26;
                                      _context.t0 = _context["catch"](14);

                                      _iterator2.e(_context.t0);

                                    case 29:
                                      _context.prev = 29;

                                      _iterator2.f();

                                      return _context.finish(29);

                                    case 32:
                                      _context.next = 34;
                                      return _setup.TeamSl.findAll({
                                        where: {
                                          league_id: team.league_id
                                        },
                                        transaction: t
                                      });

                                    case 34:
                                      waiverTeams = _context.sent;
                                      _iterator3 = _createForOfIteratorHelper(waiverTeams);
                                      _context.prev = 36;

                                      _iterator3.s();

                                    case 38:
                                      if ((_step3 = _iterator3.n()).done) {
                                        _context.next = 45;
                                        break;
                                      }

                                      waiverTeam = _step3.value;

                                      if (!(waiverTeam.waiver < winner.waiver)) {
                                        _context.next = 42;
                                        break;
                                      }

                                      return _context.abrupt("continue", 43);

                                    case 42:
                                      _setup.TeamSl.update({
                                        waiver: waiverTeam.waiver - 1
                                      }, {
                                        where: {
                                          id_sl: waiverTeam.id_sl
                                        },
                                        transaction: t
                                      });

                                    case 43:
                                      _context.next = 38;
                                      break;

                                    case 45:
                                      _context.next = 50;
                                      break;

                                    case 47:
                                      _context.prev = 47;
                                      _context.t1 = _context["catch"](36);

                                      _iterator3.e(_context.t1);

                                    case 50:
                                      _context.prev = 50;

                                      _iterator3.f();

                                      return _context.finish(50);

                                    case 53:
                                      _setup.TeamSl.update({
                                        waiver: waiverTeams.length
                                      }, {
                                        where: {
                                          id_sl: winner.id_sl
                                        },
                                        transaction: t
                                      });

                                      _context.next = 56;
                                      return _setup.FreeAgencyHistory.create({
                                        action: 'PICK',
                                        event_date: now,
                                        id_sl: winner.id_sl,
                                        id_player: bid.id_player
                                      }, {
                                        transaction: t
                                      });

                                    case 56:
                                      _context.next = 58;
                                      return _setup.TeamPlayer.create({
                                        id_sl: winner.id_sl,
                                        id_player: bid.id_player,
                                        primary_position: player.default_primary,
                                        secondary_position: player.default_secondary,
                                        order: 999
                                      }, {
                                        transaction: t
                                      });

                                    case 58:
                                      _context.next = 60;
                                      return _setup.PlayerBid.update({
                                        processed: true
                                      }, {
                                        where: {
                                          id_bid: bid.id_bid
                                        },
                                        transaction: t
                                      });

                                    case 60:
                                    case "end":
                                      return _context.stop();
                                  }
                                }
                              }, _callee, null, [[14, 26, 29, 32], [36, 47, 50, 53]]);
                            }));

                            return function (_x2) {
                              return _ref.apply(this, arguments);
                            };
                          }());

                        case 12:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _loop);
                });

                _iterator.s();

              case 8:
                if ((_step = _iterator.n()).done) {
                  _context3.next = 12;
                  break;
                }

                return _context3.delegateYield(_loop(), "t0", 10);

              case 10:
                _context3.next = 8;
                break;

              case 12:
                _context3.next = 17;
                break;

              case 14:
                _context3.prev = 14;
                _context3.t1 = _context3["catch"](5);

                _iterator.e(_context3.t1);

              case 17:
                _context3.prev = 17;

                _iterator.f();

                return _context3.finish(17);

              case 20:
                return _context3.abrupt("return", true);

              case 21:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee2, null, [[5, 14, 17, 20]]);
      }));

      function resolve(_x) {
        return _resolve.apply(this, arguments);
      }

      return resolve;
    }()
  },
  saveBid: {
    description: 'Save a bid',
    type: _playerBid.PlayerBid,
    args: {
      bid: {
        type: AuctionInput
      }
    },
    resolve: function () {
      var _resolve2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(root, _ref2) {
        var bid, id_bid, id_auction, id_player, id_sl, salary, years, auction, team, id_league, league, configs, salaryCapConfig, salaryCap, contracts, salaries, bids, bidSalaries, teamCap, minBid, maxBid, increments, maxPlayers, roster, offset, now, nowDate, expiration, savedIdBid, operation;
        return regeneratorRuntime.wrap(function _callee4$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                bid = _ref2.bid;
                id_bid = bid.id_bid, id_auction = bid.id_auction, id_player = bid.id_player, id_sl = bid.id_sl, salary = bid.salary, years = bid.years;
                _context5.next = 4;
                return _setup.Auction.findOne({
                  where: {
                    id_auction: id_auction
                  }
                });

              case 4:
                auction = _context5.sent;

                if (auction) {
                  _context5.next = 7;
                  break;
                }

                throw new Error('AUCTION_NOT_FOUND');

              case 7:
                if (!(auction.status !== _auctionStatus.AuctionStatus.parseValue('STATUS_OPEN'))) {
                  _context5.next = 9;
                  break;
                }

                throw new Error('AUCTION_NOT_OPEN');

              case 9:
                _context5.next = 11;
                return _setup.TeamSl.findOne({
                  where: {
                    id_sl: id_sl
                  }
                });

              case 11:
                team = _context5.sent;

                if (team) {
                  _context5.next = 14;
                  break;
                }

                throw new Error('TEAM_NOT_FOUND');

              case 14:
                id_league = team.league_id;
                _context5.next = 17;
                return _setup.League.findOne({
                  where: {
                    id_league: id_league
                  }
                });

              case 17:
                league = _context5.sent;
                _context5.next = 20;
                return league.getConfigs();

              case 20:
                configs = _context5.sent;
                salaryCapConfig = configs.find(function (config) {
                  return config.id_config === 'SALARY_CAP';
                });
                salaryCap = Number(salaryCapConfig.config_value) * 1000 * 1000;

                if (!isNaN(salaryCap)) {
                  _context5.next = 25;
                  break;
                }

                throw new Error('SALARY_CAP_NOT_AVAILABLE');

              case 25:
                _context5.next = 27;
                return _setup.TeamSl.RosterSalary({
                  id_sl: id_sl,
                  id_league: id_league
                });

              case 27:
                contracts = _context5.sent;
                salaries = contracts.reduce(function (soFar, contract) {
                  return soFar + contract.contract_salary;
                }, 0);
                _context5.next = 31;
                return _setup.PlayerBid.findAll({
                  where: {
                    id_auction: id_auction,
                    id_sl: id_sl,
                    id_player: {
                      $ne: id_player
                    },
                    expiration: {
                      $gte: new Date()
                    }
                  }
                });

              case 31:
                bids = _context5.sent;
                bidSalaries = bids.reduce(function (soFar, bidSalary) {
                  return soFar + bidSalary.salary;
                }, 0);
                teamCap = salaryCap - salaries - bidSalaries;

                if (!(teamCap <= 0)) {
                  _context5.next = 36;
                  break;
                }

                throw new Error('NO_CAP_FOR_BID');

              case 36:
                if (!(teamCap < salary)) {
                  _context5.next = 38;
                  break;
                }

                throw new Error('SALARY_EXCEEDS_CAP');

              case 38:
                minBid = Number(configs.find(function (config) {
                  return config.id_config === 'AUCTION_MIN_BID';
                }).config_value);

                if (!(!isNaN(minBid) && salary < minBid)) {
                  _context5.next = 41;
                  break;
                }

                throw new Error('SALARY_LOWER_MIN_BID');

              case 41:
                maxBid = Number(configs.find(function (config) {
                  return config.id_config === 'AUCTION_MAX_BID';
                }).config_value);

                if (!(!isNaN(maxBid) && salary > maxBid)) {
                  _context5.next = 44;
                  break;
                }

                throw new Error('SALARY_HIGHER_MAX_BID');

              case 44:
                increments = Number(configs.find(function (config) {
                  return config.id_config === 'AUCTION_BID_INCREMENT';
                }).config_value);

                if (!(!isNaN(increments) && salary % increments !== 0)) {
                  _context5.next = 47;
                  break;
                }

                throw new Error('SALARY_NOT_IN_INCREMENTS');

              case 47:
                maxPlayers = Number(configs.find(function (config) {
                  return config.id_config === 'MAX_PLAYERS';
                }).config_value);
                _context5.next = 50;
                return team.getPlayers();

              case 50:
                roster = _context5.sent;

                if (!(roster.length + bids.length >= maxPlayers)) {
                  _context5.next = 53;
                  break;
                }

                throw new Error('BID_EXCEEDS_ROSTER');

              case 53:
                offset = Number(configs.find(function (config) {
                  return config.id_config === 'AUCTION_BID_OFFSET_TIME';
                }).config_value);
                now = Date.now();
                nowDate = new Date();

                if (isNaN(offset)) {
                  expiration = new Date(now + 72 * 60 * 60 * 1000); // Default
                } else {
                  expiration = new Date(now + offset);
                }

                savedIdBid = id_bid;
                _context5.next = 60;
                return _connection["default"].transaction( /*#__PURE__*/function () {
                  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(t) {
                    var updateBid, updateTotal, total, tomorrow, shouldUpdateBid, updateTeam, bidUpdate, bidExists, createBid, bidHistory;
                    return regeneratorRuntime.wrap(function _callee3$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            if (!id_bid) {
                              _context4.next = 24;
                              break;
                            }

                            _context4.next = 3;
                            return _setup.PlayerBid.findOne({
                              where: id_bid
                            });

                          case 3:
                            updateBid = _context4.sent;

                            if (updateBid) {
                              _context4.next = 6;
                              break;
                            }

                            throw new Error('BID_DOES_NOT_EXIST');

                          case 6:
                            updateTotal = updateBid.salary * updateBid.years;
                            total = salary * years;

                            if (!(updateTotal > total)) {
                              _context4.next = 10;
                              break;
                            }

                            throw new Error('BID_IS_LOWER');

                          case 10:
                            // Bids expiring in less than 24 hours will only extend for an additional day.
                            tomorrow = new Date(now + 24 * 60 * 60 * 1000);

                            if (updateBid.expiration < tomorrow) {
                              expiration = tomorrow;
                            }

                            shouldUpdateBid = true;

                            if (!(updateTotal === total)) {
                              _context4.next = 18;
                              break;
                            }

                            _context4.next = 16;
                            return updateBid.getTeam();

                          case 16:
                            updateTeam = _context4.sent;

                            if (team.waiver > updateTeam.waiver) {
                              shouldUpdateBid = false;
                            }

                          case 18:
                            if (!shouldUpdateBid) {
                              _context4.next = 22;
                              break;
                            }

                            _context4.next = 21;
                            return _setup.PlayerBid.update({
                              id_sl: id_sl,
                              salary: salary,
                              years: years,
                              expiration: expiration
                            }, {
                              where: {
                                id_bid: id_bid
                              },
                              transaction: t
                            });

                          case 21:
                            bidUpdate = _context4.sent;

                          case 22:
                            _context4.next = 33;
                            break;

                          case 24:
                            _context4.next = 26;
                            return _setup.PlayerBid.findOne({
                              where: {
                                id_auction: id_auction,
                                id_player: id_player,
                                processed: false
                              }
                            });

                          case 26:
                            bidExists = _context4.sent;

                            if (!bidExists) {
                              _context4.next = 29;
                              break;
                            }

                            throw new Error('PLAYER_ALREADY_IN_AUCTION');

                          case 29:
                            _context4.next = 31;
                            return _setup.PlayerBid.create({
                              id_sl: id_sl,
                              id_auction: id_auction,
                              id_player: id_player,
                              salary: salary,
                              years: years,
                              expiration: expiration
                            }, {
                              transaction: t
                            });

                          case 31:
                            createBid = _context4.sent;
                            savedIdBid = createBid.id_bid;

                          case 33:
                            _context4.next = 35;
                            return _setup.PlayerBidHistory.findOne({
                              where: {
                                id_bid: savedIdBid,
                                id_sl: id_sl,
                                id_player: id_player,
                                salary: salary,
                                years: years
                              }
                            });

                          case 35:
                            bidHistory = _context4.sent;

                            if (!bidHistory) {
                              _context4.next = 38;
                              break;
                            }

                            throw new Error('BID_ALREADY_EXISTS');

                          case 38:
                            return _context4.abrupt("return", _setup.PlayerBidHistory.create({
                              id_sl: id_sl,
                              id_player: id_player,
                              salary: salary,
                              years: years,
                              bid_time: nowDate,
                              id_bid: savedIdBid
                            }, {
                              transaction: t
                            }));

                          case 39:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee3);
                  }));

                  return function (_x5) {
                    return _ref3.apply(this, arguments);
                  };
                }());

              case 60:
                operation = _context5.sent;
                return _context5.abrupt("return", {
                  id_bid: savedIdBid,
                  id_auction: id_auction,
                  id_sl: id_sl,
                  id_player: id_player,
                  salary: salary,
                  years: years,
                  expiration: expiration
                });

              case 62:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee4);
      }));

      function resolve(_x3, _x4) {
        return _resolve2.apply(this, arguments);
      }

      return resolve;
    }()
  }
};
exports.AuctionMutation = AuctionMutation;